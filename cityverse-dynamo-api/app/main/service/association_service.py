from app.db.dynamodb_document import Document
from ..service.user_service import add_user_place, remove_user_place
from boto3.dynamodb.conditions import Key
from datetime import datetime
import logging
from app.main.util.strings import generate_id
from geopy.geocoders import Nominatim

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def get_all_associations():
    document = Document(__TABLE_NAME__='Association')

    # Query all products
    associations = document.get_all()

    return associations


def get_a_association(association_id):
    document = Document(__TABLE_NAME__='Association')

    association = document.get_item(association_id)

    if association is None:
        logging.warning(f"Product with ID {association_id} not found.")

    return association


def get_association_by_name(name):
    document = Document(__TABLE_NAME__='Association')

    association = document.query(
        condition='nom = :nom',
        value={':nom': name}
    )
    if association:
        return True
    else:
        return False


def get_associations_by_sdg(numbers):
    document = Document(_TABLE_NAME_='Association')

    associations = document.query_by_index_contains('sdg-index', numbers)

    if associations:
        return {'status': 'success', 'associations': associations},200
    else:
        return {'status': 'info', 'message': 'No associations with the specified SDG numbers exist'},201
    
def validate_siege(siege):
    geolocator = Nominatim(user_agent="CityVerseProto")  # replace with your app name
    # logging.info("Checking siege exists")
    # logging.info(siege)
    location = geolocator.geocode(siege)

    # logging.info("Location location: %s" % location)

    # logging.info("location raw: %s" % location.raw)

    if location and location.raw.get('osm_type') == 'node':  
        return location.address
    else:
        return None


def check_siege_exists(data):
    geolocator = Nominatim(user_agent="CityVerseProto") 
    location = geolocator.geocode(data['siege'])
    logging.info("Location location: %s" % location)
    logging.info("location raw: %s" % location.raw)
    if location and location.raw.get('osm_type') == 'node': 
        return {
            'status': 'success',
            'message': 'Siege exists.'

        } , 201
    else:
        return {
            'status': 'failed',
            'message': 'Siege does not exist.'

        } , 404

    


def create_association(data,banner_image,profile_image):
    document = Document(__TABLE_NAME__='Association')

    banner_image_url = None
    # Upload product banner image to S3
    if banner_image:
        banner_image_url = document.upload_image_to_s3(
            banner_image)
        if banner_image_url is None:
            return {
                'status': 'fail',
                'message': 'Failed to upload profile image to S3.',
            }, 500

    profile_image_url = None

    if profile_image:
        profile_image_url = document.upload_image_to_s3(
            profile_image)
        if profile_image_url is None:
            return {
                'status': 'fail',
                'message': 'Failed to upload profile image to S3.',
            }, 500
        
    siege = data.get('siege', '')

    valid_siege =  validate_siege(siege)
        
        

    association_item = {
        'id': generate_id(),
        'created_on': datetime.utcnow().isoformat(),
        'modified_on': datetime.utcnow().isoformat(),
        'user_id': data['created_by'],
        'activity': data['activity'],
        'name': data['name'],
        'sdg': data['sdg'],
        'description': data['description'],
        'siege': valid_siege,
        'links': data['social_links'],
        'banner_image': banner_image_url,
        'profile_image': profile_image_url
    }

    try:
        document.save(item=association_item)
        add_user_place(user_id=data['created_by'], place_id=association_item['id'])

        return {
            'status': 'success',
            'message': 'Association successfully created.',
        }, 201
    except Exception as e:
        return {
            'status': 'fail',
            'message': f'Failed to create association: {str(e)}',
            'user_place_error': e.details if hasattr(e, 'details') else None,
        }, 500



def delete_association(association_id):
    document = Document(__TABLE_NAME__='Association')

    place = get_a_association(association_id)

    if place:
        try:
            document.delete_item(Key={'id': association_id})
            remove_user_place(place['created_by'], association_id)
            return {
                'status': 'success',
                'message': 'Association successfully deleted.',
            }, 200
        except Exception as e:
            return {
                'status': 'fail',
                'message': f'Failed to delete association: {str(e)}',
                'user_place_error': e.details if hasattr(e, 'details') else None,
            }, 500
    else:
        return {
            'status': 'fail',
            'message': 'Association not found.',
        }, 404


def edit_association(association_id, data):
    document = Document(__TABLE_NAME__='Association')

    place = get_a_association(association_id)

    if place:
        place.update({
            'created_on': data.get('created_on', place.get('created_on')),
            'modified_on': datetime.utcnow().isoformat(),
            'coordinate': data.get('coordinate', place.get('coordinate')),
            'created_by': data.get('created_by', place.get('created_by')),
            'modified_by': data.get('modified_by', place.get('modified_by')),
            'name': data.get('name', place.get('name')),
            'sgd': data.get('sgd', place.get('sgd'))
        })

        # Save the updated product item
        document.save(item=place)

        return {
            'status': 'success',
            'message': 'Product successfully updated.',
        }, 201
    else:

        return {
            'status': 'fail',
            'message': 'Place not found.',
        }, 401

