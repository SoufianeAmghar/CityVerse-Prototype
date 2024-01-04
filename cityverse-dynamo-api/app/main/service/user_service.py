from app.db.dynamodb_document import Document
from datetime import datetime
import logging
from app.main.util.strings import generate_id

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
        profile_image_url = document.upload_profile_image_to_s3(
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
        'profile_image': profile_image_url if profile_image_url else "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/profile-images/blank-profile-picture.webp",
        # Use [] as a default value if interest_points is None
        'interest_points_id': data.get('interest_points_id', [])
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


def update_user(user_id, data, profile_image):
    document = Document(__TABLE_NAME__='User', __BUCKET_NAME__='cityverse-profilepics',
                        __S3_OBJECT_PREFIX__='profile-images/')
    profile_image_url = None

    if profile_image:
        profile_image_url = document.upload_profile_image_to_s3(profile_image)
        if profile_image_url is None:
            return {
                'status': 'fail',
                'message': 'Failed to upload profile image to S3.',
            }, 500
    user = get_a_user(user_id)

    if user:
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


def join_product(user_id, product_id):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)
    user['modified_on'] = datetime.utcnow().isoformat()
    converted_user = document.convert_dynamodb_item_to_string(user)
    converted_user['interest_points_id'].append(product_id)
    document.save(item=converted_user)

    return {
        'status': 'success',
        'message': 'User joined with the product.',
    }, 201


def unjoin_product(user_id, product_id):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)
    if user:
        user["interest_points_id"].remove(product_id)

    document.save(item=user)

    return {
        'status': 'success',
        'message': 'User joined with the product.',
    }, 201


def unjoin_products(user_id, product_ids):
    document = Document(__TABLE_NAME__='User')
    user = get_a_user(user_id)

    if user:
        for product_id in product_ids:
            if product_id in user.get("interest_points_id", []):
                user["interest_points_id"].remove(product_id)

    document.save(item=user)

    return {
        'status': 'success',
        'message': 'User unsubscribed from the product(s).',
    }, 200


def delete_user(user_id):
    document = Document(__TABLE_NAME__='User')

    # Delete a user by their unique identifier
    user = get_a_user(user_id)
    if user:
        unjoin_products(user_id, user["interest_points_id"])
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


def get_user_by_email(email):
    document = Document(__TABLE_NAME__='User')
    # Retrieve a user by their email address
    user = document.query(index='email-index', condition='email = :email',
                          value={':email': email})
    if user:
        return True
    else:
        return False
