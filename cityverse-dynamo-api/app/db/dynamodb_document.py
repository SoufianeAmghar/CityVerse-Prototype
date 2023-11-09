import boto3
from botocore.exceptions import NoCredentialsError
import logging

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class Document:

    __TABLE_NAME__ = None

    def __init__(self, **kwargs):
        self._id = None
        for k, v in kwargs.items():
            setattr(self, k, v)

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    def save(self, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        # Generate a unique ID (assuming generate_id is your custom function)
        self._id = generate_id()

        table = dynamodb_client.Table(self.__TABLE_NAME__)
        item = self.to_dict()
        item['_id'] = self._id
        response = table.put_item(Item=item)
        return self

    def load(self, dynamodb_client=None, query=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        if not query:
            query = {'_id': self._id}

        table = dynamodb_client.Table(self.__TABLE_NAME__)
        response = table.get_item(Key={'_id': self._id})

        item = response.get('Item')
        if item:
            self.from_dict(item)
        else:
            self._id = None
        return self

    def get_item(self,id):
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
            logging.info(f"Error: {e}")
            return None



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