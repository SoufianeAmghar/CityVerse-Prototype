import boto3
from botocore.exceptions import NoCredentialsError
import logging
import bcrypt
from app.main.util.strings import generate_id
import json

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


class Document:

    __TABLE_NAME__ = None

    def __init__(self, table_name=None, **kwargs):
        self._id = None
        self.__TABLE_NAME__ = table_name or self.__TABLE_NAME__

        for k, v in kwargs.items():
            setattr(self, k, v)

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    def save(self, item):
        dynamodb_resource = boto3.resource('dynamodb')


        table = dynamodb_resource.Table(self.__TABLE_NAME__)

        table.put_item(Item=item)

    def load(self, dynamodb_client=None, query=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        if not query:
            query = {'id': {'S': self._id}}

        response = dynamodb_client.get_item(
                TableName=self.__TABLE_NAME__,
                Key=query  
            )

        item = response.get('Item')
        if item:
            self.from_dict(item)
        else:
            self._id = None
        return self

    def get_item(self, id):
        dynamodb_client = boto3.client('dynamodb')

        try:
            response = dynamodb_client.get_item(
                TableName=self.__TABLE_NAME__,
                Key={'id': {'S': id}}  # Pass the primary key as a dictionary
            )

            item = response.get('Item')
            if item:
                return item
            else:
                return None
        except Exception as e:
            # Handle any exceptions or errors here
            logging.error(f"Error: {e}")
            return None
    
    def query(self, index, condition, value):
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(self.__TABLE_NAME__)

        # Ensure that value is a dictionary
        if not isinstance(value, dict):
            raise ValueError("The 'value' parameter must be a dictionary.")

        response = table.query(
            IndexName=index,
            KeyConditionExpression=condition,
            ExpressionAttributeValues=value
        )

        

        items = response.get('Items', [])

        return items if items else None


    def delete(self, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        if self._id:
            table = dynamodb_client.Table(self.__TABLE_NAME__)
            response = table.delete_item(Key={'_id': self._id})

        return self

    def to_dict(self):
        # Customize this method to convert your object attributes to a dictionary
        return {}

    def from_dict(self, d):
     if d:
        for key, value in d.items():
            if key == 'password':
                # Handle password separately
                self.password_hash = bcrypt.hashpw(str(value).encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            else:
                setattr(self, key, value)
     else:
        self._id = None
     return self

    def get_all(self, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.resource('dynamodb')

        table = dynamodb_client.Table(self.__TABLE_NAME__)

        response = table.scan()

        return response.get('Items', [])

    @classmethod
    def drop(cls, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        table = dynamodb_client.Table(cls.__TABLE_NAME__)
        response = table.delete()
        return response
