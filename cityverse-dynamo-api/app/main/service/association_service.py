from app.db.dynamodb_document import Document
from ..service.user_service import add_user_place, remove_user_place
from boto3.dynamodb.conditions import Key
from datetime import datetime
import logging
from app.main.util.strings import generate_id
from geopy.geocoders import Nominatim
import requests

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


def get_a_association(association_id,data):
    document = Document(__TABLE_NAME__='Association')

    name = data['name']

    association = document.get_item(association_id,name)


    if association is None:
        logging.warning(f"Association with ID {association_id} not found.")

    return association



def get_associations_by_sdg(numbers):
    document = Document(_TABLE_NAME_='Association')

    associations = document.query_by_index_contains('sdg-index', numbers)

    if associations:
        return {'status': 'success', 'associations': associations}, 200
    else:
        return {'status': 'info', 'message': 'No associations with the specified SDG numbers exist'}, 201


def validate_siege(siege):
    # replace with your app name
    geolocator = Nominatim(user_agent="CityVerseProto")
    location = geolocator.geocode(siege)

    if location and location.raw.get('osm_type') == 'node':
        return location.address
    else:
        return str(location) if location else None


def check_siege_exists(data):
    geolocator = Nominatim(user_agent="CityVerseProto")
    location = geolocator.geocode(data['siege'])
    logging.info("Location location: %s" % location)
    logging.info("location raw: %s" % location.raw)
    if location and location.raw.get('osm_type') == 'node':
       return {
            "status": "success",
            "message": "Siege exists.",
            "lat": location.latitude,
            "long": location.longitude
        }, 201
    else:
        return {
            'status': 'failed',
            'message': 'Siege does not exist.'

        }, 404


def verify_rna_number(rna_number):
    endpoint = f'https://staging.entreprise.api.gouv.fr/v4/djepva/api-association/associations/{rna_number}'

    try:
        response = requests.get(endpoint)
        response_data = response.json()

        if response.status_code == 200:
            # The RNA number is valid, and you can use response_data for further processing
            return {
                'status': 'success',
                'message': 'RNA number is valid.',
                'data': response_data
            }, 200
        else:
            # The RNA number is not valid or there was an issue with the API
            return {
                'status': 'fail',
                'message': f'Failed to verify RNA number. API returned status code {response.status_code}.',
                'data': response_data
            }, 500

    except Exception as e:
        # Handle other exceptions if needed
        return {
            'status': 'fail',
            'message': f'Failed to verify RNA number: {str(e)}',
        }, 500


def create_association(data, banner_image, profile_image):

    document = Document(__TABLE_NAME__='Association', __BUCKET_NAME__='cityverse-profilepics',
                            __S3_OBJECT_PREFIX__='product-images/')
    # Check if 'rna' is empty or None
    if data.get('rna') is None or not data['rna'].strip():
        return {
            'status': 'fail',
            'message': 'RNA cannot be None or empty.',
        }, 404

    # Check if 'activity' is None or empty
    if data.get('activity') is None or not data['activity'].strip():
        return {
            'status': 'fail',
            'message': 'Activity cannot be None or empty.',
        }, 404

    # Check if 'name' is None or empty
    if data.get('name') is None or not data['name'].strip():
        return {
            'status': 'fail',
            'message': 'Name cannot be None or empty.',
        }, 404

    banner_image_url = None
    # Upload product banner image to S3
    if banner_image:
        banner_image_url = document.upload_image_to_s3(banner_image)
        if banner_image_url is None:
            return {
                'status': 'fail',
                'message': 'Failed to upload banner image to S3.',
            }, 500

    profile_image_url = None
    if profile_image:
        profile_image_url = document.upload_image_to_s3(profile_image)
        if profile_image_url is None:
            return {
                'status': 'fail',
                'message': 'Failed to upload profile image to S3.',
            }, 500

    siege = data.get('siege', '')
    valid_siege = validate_siege(siege)

    association_item = {
        'id': generate_id(),
        'created_on': datetime.utcnow().isoformat(),
        'modified_on': datetime.utcnow().isoformat(),
        'user_id': data['created_by'],
        'activity': data['activity'],
        'name': data['name'],
        'sdg': data['sdg'],
        'rna': data['rna'],
        'description': data['description'],
        'siege': valid_siege,
        'siege_coordinates': data['siege_coordinates'],
        'links': data['social_links'],
        'banner_image': banner_image_url,
        'profile_image': profile_image_url
    }

    try:
        document.save(item=association_item)
        add_user_place(user_id=data['created_by'],
                       place_id=association_item['id'])

        return {
            'status': 'success',
            'message': 'Association successfully created.',
        }, 201
    except Exception as e:
        return {
            'status': 'fail',
            'message': f'Failed to create association: {str(e)}'
        }, 500


def delete_association(association_id, data):
    document = Document(__TABLE_NAME__='Association')

    try:
        # Your existing code to get the association
        place = get_a_association(association_id, data)

        if place:
            # Your existing code to remove user place
            remove_user_place(place['user_id'], association_id)

            # Your existing code to perform deletion
            document.delete(association_id, data.get('name'))

            return {
                'status': 'success',
                'message': 'Association successfully deleted.',
            }, 200
        else:
            return {
                'status': 'fail',
                'message': 'Association not found.',
            }, 404

    except Exception as e:
        # Handle any exceptions or errors here
        logging.error(f"Error: {e}")
        return {
            'status': 'fail',
            'message': f'Failed to delete association: {str(e)}',
            'user_place_error': e.details if hasattr(e, 'details') else None,
        }, 500


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
