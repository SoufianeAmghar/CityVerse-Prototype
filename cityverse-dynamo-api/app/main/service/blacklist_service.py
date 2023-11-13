import boto3
from botocore.exceptions import ClientError


dynamodb = boto3.resource('dynamodb')
table_name = 'Blacklist'
table = dynamodb.Table(table_name)

def save_token(token):
    try:
        # Check if the token already exists in the blacklist
        response = table.get_item(
            Key={'token': token}
        )
        if 'Item' not in response:
            # Token does not exist in the blacklist, add it
            table.put_item(Item={'token': token})
            response_object = {
                'status': 'success',
                'message': 'Successfully logged out.'
            }
            return response_object, 200
        else:
            # Token already exists in the blacklist
            response_object = {
                'status': 'fail',
                'message': 'Token is already blacklisted.'
            }
            return response_object, 200

    except ClientError as e:
        response_object = {
            'status': 'fail',
            'message': f"Error saving token: {e.response['Error']['Message']}"
        }
        return response_object, 500