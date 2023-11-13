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
    document = Document(__TABLE_NAME__='User')

    # Check if the user already exists by email
    
    existing_user = get_user_by_email(data['email'])
    if existing_user:
        return {
            'status': 'fail',
            'message': 'User with this email already exists. Please log in.',
        }, 409
    
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
        # Use [] as a default value if interest_points is None
        'interest_points': data.get('interest_points', [])
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

    logging.info(user)

    return user


def update_user(user_id, data):
    document = Document(__TABLE_NAME__='User')

    # Update user information based on the provided data
    user = get_a_user(table_name, user_id)
    if user:
        user['email'] = data['email']
        user['last_name'] = data['last_name']
        user['first_name'] = data['first_name']
        user['role'] = data.get('role')
        user['admin'] = data.get('admin')
        user['password'] = data.get('password')
        user['modified_on'] = datetime.utcnow().isoformat()

        # Save the updated user item
        document.put_item(Item='User')

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
    user = get_a_user(table_name, user_id)
    if user:
        document.delete_item(Key={'user_id': user_id})
        return True
    else:
        return False


def update_password(user_id, new_password):
    document = Document(__TABLE_NAME__='User')

    # Update a user's password
    user = get_a_user(table_name, user_id)
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
