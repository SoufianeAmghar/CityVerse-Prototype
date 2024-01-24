from app.db.dynamodb_document import Document
from ..service.user_service import get_a_user
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
    
def check_siege_exists(siege):
    geolocator = Nominatim(user_agent="CityVerseProto")  # replace with your app name
    logging.info("Checking siege exists")
    logging.info(siege)
    location = geolocator.geocode(siege)

    # logging.info("Location location: %s" % location)

    # logging.info("location raw: %s" % location.raw)

    if location and location.raw.get('osm_type') == 'node':  
        return location.address
    else:
        return False



def create_association(data,banner_image,profile_image):
    document = Document(__TABLE_NAME__='Place')

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

    valid_siege =  check_siege_exists(siege)

    if valid_siege == False:
        return {
            'status': 'failed',
            'message': 'Siege does not exist.'

        } , 404
        

    association_item = {
        'id': generate_id(),
        'created_on': datetime.utcnow().isoformat(),
        'modified_on': datetime.utcnow().isoformat(),
        'user_id': data['created_by'],
        'modified_by': data['modified_by'],
        'name': data['name'],
        'sdg': [1, 2, 3],
        'description': data['description'],
        'siege': valid_siege,
        'links': data['social_links'],
        'banner_image': banner_image_url,
        'profile_image': profile_image_url
    }

    document.save(item=association_item)

    return {
        'status': 'success',
        'message': 'Association successfully created.',
    }, 201


def delete_association(association_id):
    document = Document(__TABLE_NAME__='Association')

    place = get_a_association(association_id)

    if place:
        document.delete_item(Key={'id': association_id})
        return {
            'status': 'success',
            'message': 'Association successfully deleted.',
        }, 200
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

