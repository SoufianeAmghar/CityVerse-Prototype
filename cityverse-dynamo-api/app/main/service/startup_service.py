import boto3
from botocore.exceptions import NoCredentialsError
from app.main.util.strings import time_now, generate_id

def save_user_up():
    # Create a DynamoDB client
    dynamodb_client = boto3.client('dynamodb')

    user = {
        'id': generate_id(),
        "email": "admin@admin.ma",
        "last_name": "admin",
        "first_name": "admin",
        "password": "admincityverse",
        'created_on': str(time_now()),
        'modified_on': str(time_now()),
    }

    try:
        # Check if the user with the specified email already exists
        existing_user = dynamodb_client.query(
            TableName='User',
            IndexName='email-index',  # Specify the GSI name
            KeyConditionExpression='email = :email',
            ExpressionAttributeValues={':email': {'S': user['email']}}
        )

        if 'Items' not in existing_user or not existing_user['Items']:
            # Save the user item to the DynamoDB table
            response = dynamodb_client.put_item(
                TableName='User',
                Item={
                    'id': {'S': user['id']},
                    'email': {'S': user['email']},
                    'last_name': {'S': user['last_name']},
                    'first_name': {'S': user['first_name']},
                    'password': {'S': user['password']},
                    'created_on': {'S': user['created_on']},
                    'modified_on': {'S': user['modified_on']},
                }
            )

            return user
        else:
            # User with the specified email already exists, do something or return an appropriate value
            return None
    except NoCredentialsError:
        return None



