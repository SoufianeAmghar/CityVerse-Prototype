from app.db.dynamodb_document import Document
from datetime import datetime
import logging
from app.main.util.strings import generate_id
from geopy.geocoders import Nominatim
from decimal import Decimal

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def save_new_user(data):
    document = Document(__TABLE_NAME__='User', __BUCKET_NAME__='cityverse-profilepics',
                        __S3_OBJECT_PREFIX__='profile-images/')

    # Check if the user already exists by email

    existing_user = get_user_by_email(data['email'])
    if existing_user:
        return {
            'status': 'fail',
            'message': 'User with this email already exists. Please log in.',
        }, 409

    profile_image_url = None
    # Upload user image to S3
    if data.get('profile_image'):
        profile_image_url = document.upload_image_to_s3(
            data['profile_image'])
    # if profile_image_url is None:
    #     return {
    #         'status': 'fail',
    #         'message': 'Failed to upload profile image to S3.',
    #     }, 500

    # Create a new user item
    user_item = {
        'id': generate_id(),
        'email': data['email'],
        'last_name': data['last_name'],
        'first_name': data['first_name'],
        'password': data['password'],
        'created_on': datetime.utcnow().isoformat(),
        'modified_on': datetime.utcnow().isoformat(),
        'is_creator': data['is_creator'],
        'score': int(0),
        'total_products_created': int(0),
        'total_events_joined': int(0),
        'total_places_joined': int(0),
        'address': '',
        'address_coordinates': [],
        'banner_image': "",
        'description': '',
        'social_links': [],
        'sdg': [],
        'profile_image': profile_image_url if profile_image_url else "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/profile-images/blank-profile-picture.webp",



    }

    # Save the user item to the DynamoDB table
    document.save(item=user_item)

    return {
        'status': 'success',
        'message': 'User successfully created.',
    }, 201


def get_all_users():
    document = Document(__TABLE_NAME__='User')

    # Query users based on the provided query (filter expression)
    users = document.get_all()

    return users


def get_a_user(user_id):
    document = Document(__TABLE_NAME__='User')

    user = document.get_item(user_id)

    if user is None:
        logging.warning(f"User with ID {user_id} not found.")

    return user


def validate_home_address(address):
    geolocator = Nominatim(user_agent="CityVerseProto")
    location = geolocator.geocode(address)

    if location and location.raw.get('osm_type') == 'node':
        latitude = Decimal(str(location.latitude))
        longitude = Decimal(str(location.longitude))
        return {
            'address': location.address,
            'coordinates': {
                'latitude': latitude,
                'longitude': longitude
            }
        }
    else:
        return {
            'address': str(location) if location else None,
            'coordinates': None
        }


def update_user(user_id, data, profile_image):
    document = Document(__TABLE_NAME__='User', __BUCKET_NAME__='cityverse-profilepics',
                        __S3_OBJECT_PREFIX__='profile-images/')
    profile_image_url = None

    if profile_image:
        profile_image_url = document.upload_image_to_s3(profile_image)
        if profile_image_url is None:
            return {
                'status': 'fail',
                'message': 'Failed to upload profile image to S3.',
            }, 500
    user = get_a_user(user_id)

    if user:
        if 'address' in data:
            if 'address' not in user and user.get('address') != '':
                user['score'] = int(user.get('score', 0)) + 20

            address_data = validate_home_address(data['address'])
            if address_data:
                user['address'] = address_data['address']
                user['address_coordinates'] = address_data['coordinates']
        if 'email' in data:
            user['email'] = data.get('email')
        if 'last_name' in data:
            user['last_name'] = data.get('last_name')
        if 'first_name' in data:
            user['first_name'] = data.get('first_name')
        if 'password' in data:
            user['password'] = data.get('password')
        if 'is_creator' in data:
            user['is_creator'] = data.get('is_creator')
        if 'created_on' in data:
            user['created_on'] = data.get('created_on')
        if profile_image_url:
            user['profile_image'] = str(profile_image_url)

    user['id'] = str(user_id)
    user['modified_on'] = datetime.utcnow().isoformat()

    # Save the updated user item
    document.save(item=user)

    return {
        'status': 'success',
        'message': 'User successfully updated.',
    }, 201


def update_login_time_and_score(user_id, hours_spent, last_login):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)

    if user:
        if hours_spent > 0:
            user['hours_spent'] = int(hours_spent)
        if last_login:
            user['last_login'] = last_login
        user['id'] = str(user_id)
        user.update({
            'score': calculate_user_score(user),
            'modified_on': datetime.utcnow().isoformat()
        })

        document.save(item=user)

        return {
            'status': 'success',
            'message': 'User successfully updated.',
        }, 201

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def delete_user(user_id):
    document = Document(__TABLE_NAME__='User')

    # Delete a user by their unique identifier
    user = get_a_user(user_id)
    if user:
        document.delete_item(Key={'user_id': user_id})
        return True
    else:
        return False


def update_password(user_id, new_password):
    document = Document(__TABLE_NAME__='User')

    # Update a user's password
    user = get_a_user(user_id)
    if user:
        user['password'] = new_password
        user['modified_on'] = datetime.utcnow().isoformat()

        # Save the updated user item with the new password
        document.put_item(Item='User')
        return {
            'status': 'success',
            'message': 'Password updated successfully.',
        }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def update_user_description(user_id, data):
    document = Document(__TABLE_NAME__='User')

    user = get_a_user(user_id)
    if user:
        if 'description' in user and user.get('description') == '' and data.get('description'):
            user['score'] = int(user.get('score', 0)) + 20
        user['description'] = data.get('description')
        user['modified_on'] = datetime.utcnow().isoformat()

        document.save(item=user)
        return {
            'status': 'success',
            'message': 'Description updated successfully.',
        }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def update_user_sdg(user_id, data):
    document = Document(__TABLE_NAME__='User')

    user = get_a_user(user_id)
    if user:
        if 'sdg' in user and user.get('sdg') == [] and data.get('sdg'):
            user['score'] = int(user.get('score', 0)) + 20
        user['sdg'] = data.get('sdg')
        user['modified_on'] = datetime.utcnow().isoformat()

        document.save(item=user)
        return {
            'status': 'success',
            'message': 'SDG updated successfully.',
        }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def update_user_banner(user_id, banner_file):
    document = Document(__TABLE_NAME__='User', __BUCKET_NAME__='cityverse-profilepics',
                        __S3_OBJECT_PREFIX__='profile-images/')
    user = get_a_user(user_id)
    if user:
        if banner_file:
            if 'banner_image' in user and user.get('banner_image') == '' and banner_file:
                user['score'] = int(user.get('score', 0)) + 20

            user['banner_image'] = document.upload_image_to_s3(banner_file)
            user['modified_on'] = datetime.utcnow().isoformat()

            document.save(item=user)
            return {
                'status': 'success',
                'message': 'Banner image updated successfully.',
            }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def update_user_profile(user_id, profile_file):
    document = Document(__TABLE_NAME__='User', __BUCKET_NAME__='cityverse-profilepics',
                        __S3_OBJECT_PREFIX__='profile-images/')
    user = get_a_user(user_id)
    if user:
        if profile_file:
            if 'profile_image' in user and user.get('profile_image') == '' and profile_file:
                user['score'] = int(user.get('score', 0)) + 20

            user['profile_image'] = document.upload_image_to_s3(profile_file)
            user['modified_on'] = datetime.utcnow().isoformat()

            document.save(item=user)
            return {
                'status': 'success',
                'message': 'Profile image updated successfully.',
            }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def update_user_social(user_id, data):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)
    social_links = data.get('social_links', {})
    if user:
        if social_links:
            social_links_format = {
                'twitter': social_links.get('twitter', ''),
                'instagram':  social_links.get('instagram', ''),
                'tiktok':  social_links.get('tiktok', ''),
                'facebook':  social_links.get('facebook', '')
            }
            previous_social_links = user.get('social_links', {})

            if previous_social_links:

                for platform, link in social_links.items():
                    # Get the previous link for the platform
                    previous_link = previous_social_links.get(platform, '')
                    if link and not previous_link:
                        user['score'] = int(user.get('score', 0)) + 5
            else:  # If previous_social_links is empty
                for platform, link in social_links_format.items():
                    if link:  # Check if the link is not empty
                        user['score'] = int(user.get('score', 0)) + 5

            user['social_links'] = social_links_format
            user['modified_on'] = datetime.utcnow().isoformat()
            document.save(item=user)
            return {
                'status': 'success',
                'message': 'Social links updated successfully.',
            }, 200
        else:
            return {
                'status': 'fail',
                'message': 'Social links data not provided.',
            }, 400
    else:
        return {
            'status': 'fail',
            'message': 'No user with the provided ID found.',
        }, 404


def add_user_place(user_id, place_id):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)

    if user:
        user['places'] = user.get('places', []) + [place_id]
        user['total_places_joined'] = int(
            user.get('total_places_joined', 0)) + 1
        user['modified_on'] = datetime.utcnow().isoformat()

        document.save(item=user)  # Use 'Item' instead of 'User'
        return {
            'status': 'success',
            'message': 'User Association added successfully.',
        }, 200
    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def remove_user_place(user_id, place_id):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)

    if user:
        user['places'] = user.get('places', []) + [place_id]
        user['total_places_joined'] = int(
            user.get('total_places_joined', 0)) - 1
        user['modified_on'] = datetime.utcnow().isoformat()

        document.save(item=user)
        return {
            'status': 'success',
            'message': 'User Association removed successfully.',
        }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def add_user_event(user_id, event_id):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)

    if user:
        user['events'] = user.get('events', []) + [event_id]
        user['total_events_joined'] += 1
        user['modified_on'] = datetime.utcnow().isoformat()

        document.save(item=user)
        return {
            'status': 'success',
            'message': 'User event removed successfully.',
        }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def remove_user_event(user_id, event_id):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)

    if user:
        user['events'] = user.get('events', []) - [event_id]
        user['total_events_joined'] -= 1
        user['modified_on'] = datetime.utcnow().isoformat()

        document.save(item=user)
        return {
            'status': 'success',
            'message': 'User event removed successfully.',
        }, 200

    return {
        'status': 'fail',
        'message': 'No user with the provided ID found.',
    }, 409


def calculate_user_score(user_data):

    hours_spent = user_data.get('hours_spent', 0)
    products_created = int(user_data.get('products_created', 0))
    events_joined = int(user_data.get('events_joined', 0))

    # Weightage for each factor (you can adjust these based on your preferences)
    weightage_hours_spent = 2
    weightage_products_created = 10
    weightage_events_joined = 4

    # Calculate composite score
    user_score = (
        weightage_hours_spent * hours_spent +
        weightage_products_created * products_created +
        weightage_events_joined * events_joined
    ) + int(user_data.get('score'))

    return user_score


def get_user_by_email(email):
    document = Document(__TABLE_NAME__='User')
    # Retrieve a user by their email address
    user = document.query(index='email-index', condition='email = :email',
                          value={':email': email})
    if user:
        return True
    else:
        return False
