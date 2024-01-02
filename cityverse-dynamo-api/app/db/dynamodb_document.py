import boto3
from botocore.exceptions import NoCredentialsError
import logging
import bcrypt
from app.main.util.strings import generate_id
from pathlib import Path
import json

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


class Document:

    __TABLE_NAME__ = None

    __BUCKET_NAME__ = None

    __S3_OBJECT_PREFIX__ = None

    def __init__(self, table_name=None, **kwargs):
        self._id = None
        self.__TABLE_NAME__ = table_name or self.__TABLE_NAME__

        for k, v in kwargs.items():
            setattr(self, k, v)

    def is_image_file(self, filename):
        # Define a list of allowed image file extensions
        allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}

        # Check if the file extension is in the list of allowed extensions
        return any(filename.lower().endswith(ext) for ext in allowed_extensions)

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    def save(self, item):
        dynamodb_resource = boto3.resource('dynamodb')
        table = dynamodb_resource.Table(self.__TABLE_NAME__)

        # Check if the item has the primary key (id)
        if 'id' in item:
            # If 'id' is present, it's an existing item, perform a PUT (update) operation
            existing_item = table.get_item(Key={'id': item['id']}).get('Item', {})

            # Update only the attributes present in the update data
            for key, value in item.items():
                # Skip updating if the key is not present in the update data
                if key not in existing_item:
                    continue

                # Update the attribute only if the value is not None
                if value is not None:
                    existing_item[key] = value
            table.put_item(Item=existing_item)
        else:
            # If 'id' is not present, it's a new item, perform a POST (create) operation
            # You might want to generate a new 'id' here if needed
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
    

    def upload_profile_image_to_s3(self,image_file):
      s3 = boto3.client('s3')

      image_key = f"{self.__S3_OBJECT_PREFIX__}{generate_id()}"

      file_extension = Path(image_file.filename).suffix.lower()
      if not file_extension or not self.is_image_file(file_extension):
            logging.error("Invalid image file format.")
            return None

      try:
          s3.upload_fileobj(image_file, self.__BUCKET_NAME__, image_key, ExtraArgs={'ContentType': f'image/{file_extension[1:]}'})
          profile_image_url = f"https://{self.__BUCKET_NAME__}.s3.amazonaws.com/{image_key}"
          logging.info(f"Image uploaded to S3 successfully. URL: {profile_image_url}")
          return profile_image_url
      except FileNotFoundError:
          logging.error("Profile image file not found.")
          return None
      except NoCredentialsError:
          logging.error("Credentials not available for uploading profile image to S3.")
          return None
