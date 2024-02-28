from app.db.dynamodb_document import Document
from app.main.service.user_service import add_user_place, remove_user_place
from boto3.dynamodb.conditions import Key
from datetime import datetime
import logging
from app.main.util.strings import generate_id
from geopy.geocoders import Nominatim
import traceback
import re

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


def get_association_posts(association_id):
    document = Document(__TABLE_NAME__='Posts')

    # Query all products
    posts = document.get_all()

    if posts:
        posts_from_association = [
            post for post in posts if association_id in post['creator_id']]
        if posts_from_association:
            return posts_from_association
        else:
            return {
                'status': 'fail',
                'message': 'Association has no posts',
            }, 500

    else:
        return {
            'status': 'fail',
            'message': 'Posts not found',
        }, 500


def get_a_association(association_id):
    document = Document(__TABLE_NAME__='Association')

    association = document.get_item(association_id)

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
    # Check if rna_number is a string and matches the required format
    rna = rna_number['rna']
    if isinstance(rna, str) and re.match(r'^W\d{9}$', rna):
        return {
            'status': 'success',
            'message': 'RNA number is valid.'
        }, 200
    elif isinstance(rna, str) and re.match(r'^w\d{9}$', rna):
        return {
            'status': 'warning',
            'message': 'RNA number starts with lowercase "w". Please use capital "W" instead.'
        }, 200
    else:
        return {
            'status': 'fail',
            'message': 'Invalid RNA number format.'
        }, 400


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
    if data.get('activity') is None or len(data['activity']) == 0:
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
        'sdg': data.get('sdg', ""),
        'rna': data['rna'],
        'description': data.get('description', ""),
        'siege': valid_siege,
        'siege_coordinates': data.get('siege_coordinates', []),
        'links': data.get('social_links', []),
        'banner_image': banner_image_url if banner_image_url else "",
        'profile_image': profile_image_url if profile_image else ""
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
        traceback.print_exc()
        return {
            'status': 'fail',
            'message': f'Failed to create association: {str(e)}'
        }, 500


def delete_association(association_id):
    document = Document(__TABLE_NAME__='Association')

    try:
        # Your existing code to get the association
        place = get_a_association(association_id)

        if place:
            # Your existing code to remove user place
            remove_user_place(place['user_id'], association_id)

            # Your existing code to perform deletion
            document.delete(association_id)

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


def create_post(data, image_files, video_files):
    document = Document(__TABLE_NAME__='Posts', __BUCKET_NAME__='cityverse-videos',
                        __S3_OBJECT_PREFIX__='media-posts/')

    image_urls = []

    video_urls = []

    if image_files:
        for img_file in image_files:
            img_url = document.upload_image_to_s3(img_file)
            if img_url is not None:
                # Append the image URL to the list
                image_urls.append(img_url)
            else:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload an image to S3.',
                }, 500

    if video_files:
        for vid_file in video_files:
            vid_url = document.upload_video_to_s3(vid_file)
            if vid_url is not None:
                # Append the image URL to the list
                video_urls.append(vid_url)
            else:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload a video to S3.',
                }, 500

    # Reactions handling

    reaction_emojis = {
        'like': '👍',
        'love': '❤️',
        'haha': '😄',
        'wow': '😮',
        'sad': '😢',
        'angry': '😡'
    }

    reactions_list = list(reaction_emojis.keys())
    reactions_data = [{'type': reaction, 'reacted_by': [], 'date': datetime.utcnow().isoformat()}  #type, created_by, date
                      for reaction in reactions_list]

    comments_data = data.get('comments', [])

    post_item = {
        'id': generate_id(),
        'creator_id': data['creator_id'],
        'created_by': data['created_by'],
        'created_on': datetime.utcnow().isoformat(),
        'modified_on': datetime.utcnow().isoformat(),
        'links': image_urls + video_urls if image_urls or video_urls else [],
        'description': data['description'],
        'modified_by': "",
        'reactions': reactions_data,
        'comments': comments_data
    }

    # Save the updated product with the new post
    document.save(item=post_item)

    return {
        'status': 'success',
        'message': 'Post successfully created.',
    }, 201
