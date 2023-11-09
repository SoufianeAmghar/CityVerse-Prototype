
import boto3
from botocore.exceptions import NoCredentialsError
import datetime

class BlacklistToken:
    """
    Token Model for storing JWT tokens
    """
    __TABLE_NAME__ = "blacklist"  # Specify the DynamoDB table name

    def __init__(self, token=None):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()
        self._id = None

    def __repr__(self):
        return f'<id: {self._id}, token: {self.token}>'

    def to_dict(self):
        return {
            '_id': self._id,
            'token': self.token,
            'blacklisted_on': self.blacklisted_on.isoformat()
        }

    def from_dict(self, d):
        if d:
            self._id = d['_id']
            self.token = d['token']
            self.blacklisted_on = datetime.datetime.fromisoformat(d['blacklisted_on'])
        else:
            self._id = None

    @staticmethod
    def check_blacklist(auth_token, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        # Check whether the auth token has been blacklisted
        table = dynamodb_client.Table(BlacklistToken.__TABLE_NAME__)
        response = table.get_item(Key={'token': str(auth_token)})

        item = response.get('Item')
        if item:
            return True
        else:
            return False