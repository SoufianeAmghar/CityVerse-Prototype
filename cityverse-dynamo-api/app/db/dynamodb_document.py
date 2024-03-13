from decimal import Decimal
import boto3
from botocore.exceptions import NoCredentialsError
import logging
import bcrypt
from app.main.util.strings import generate_id
from pathlib import Path
from boto3.dynamodb.conditions import Key
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

    def is_video_file(self, filename):
        allowed_extensions = {'.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv',
                              '.webm', '.m4v', '.3gp', '.mpg', '.mpeg', '.rm',
                              '.vob', '.ts', '.m2ts', '.ogv', '.asf', '.mts', '.mxf'}
        return any(filename.lower().endswith(ext) for ext in allowed_extensions)

    def convert_dynamodb_item_to_string(self, item):
        def convert_value(value):
            if isinstance(value, dict):
                if 'S' in value:
                    return value['S']
                elif 'BOOL' in value:
                    return value['BOOL']
                elif 'N' in value:
                    return value['N']
                elif 'L' in value:
                    return [convert_value(item) for item in value['L']]
                elif 'M' in value:
                    return {key: convert_value(val) for key, val in value['M'].items()}
            elif isinstance(value, list):
                return [convert_value(item) for item in value]
            else:
                return str(value)

        result = {}
        for key, value in item.items():
            result[key] = convert_value(value)

        return result

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

    def get_item(self, id, name=None):
        dynamodb_client = boto3.client('dynamodb')

        key_condition = {'id': {'S': str(id)}}

    # Add sort key to key condition if it exists
        if name is not None:
            key_condition['name'] = {'S': str(name)}

        try:
            response = dynamodb_client.get_item(
                TableName=self.__TABLE_NAME__,
                Key=key_condition
            )

            item = response.get('Item')
            if item:
                return self.convert_dynamodb_item_to_string(item)
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

        for item in items:
            self.convert_decimals_to_float(item)

        return items if items else None

    def query_by_index_contains(self, str_index, values):
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(self.__TABLE_NAME__)

        response = table.scan(
            FilterExpression=Key(str_index).contains(values)
        )

        items = response.get('Items', [])

        return items if items else None

    def delete(self,id, name=None):
        dynamodb = boto3.resource('dynamodb')

        if id:
            table = dynamodb.Table(self.__TABLE_NAME__)
            key_condition = {'id': id}
        if name:
            key_condition['name'] = name

        logging.info(key_condition)
        
        table.delete_item(Key=key_condition)

    def to_dict(self):
        # Customize this method to convert your object attributes to a dictionary
        return {}

    def from_dict(self, d):
        if d:
            for key, value in d.items():
                if key == 'password':
                    # Handle password separately
                    self.password_hash = bcrypt.hashpw(str(value).encode(
                        'utf-8'), bcrypt.gensalt()).decode('utf-8')
                else:
                    setattr(self, key, value)
        else:
            self._id = None
        return self

    def convert_decimals_to_float(self, data):
        for key, value in data.items():
            if isinstance(value, Decimal):
                data[key] = float(value)
            elif isinstance(value, dict):
                self.convert_decimals_to_float(value)
            elif isinstance(value, list):
                for i, item in enumerate(value):
                    if isinstance(item, dict):
                        self.convert_decimals_to_float(item)
                    elif isinstance(item, Decimal):
                        value[i] = float(item)

    def get_all(self, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.resource('dynamodb')

        table = dynamodb_client.Table(self.__TABLE_NAME__)

        response = table.scan()

        items = response.get('Items', [])

        for item in items:
            self.convert_decimals_to_float(item)

        return items

    @classmethod
    def drop(cls, dynamodb_client=None):
        if not dynamodb_client:
            dynamodb_client = boto3.client('dynamodb')

        table = dynamodb_client.Table(cls.__TABLE_NAME__)
        response = table.delete()
        return response

    def upload_image_to_s3(self, image_file):
        s3 = boto3.client('s3')

        image_key = f"{self.__S3_OBJECT_PREFIX__}{generate_id()}"

        file_extension = Path(image_file.filename).suffix.lower()
        if not file_extension or not self.is_image_file(file_extension):
            logging.error("Invalid image file format.")
            return None

        try:
            s3.upload_fileobj(image_file, self.__BUCKET_NAME__, image_key, ExtraArgs={
                              'ContentType': f'image/{file_extension[1:]}'})
            profile_image_url = f"https://{self.__BUCKET_NAME__}.s3.amazonaws.com/{image_key}"
            logging.info(
                f"Image uploaded to S3 successfully. URL: {profile_image_url}")
            return profile_image_url
        except FileNotFoundError:
            logging.error("Profile image file not found.")
            return None
        except NoCredentialsError:
            logging.error(
                "Credentials not available for uploading profile image to S3.")
            return None

    def upload_video_to_s3(self, video_file):
        s3 = boto3.client('s3')

        video_key = f"{self.__S3_OBJECT_PREFIX__}{generate_id()}"

        file_extension = Path(video_file.filename).suffix.lower()
        if not file_extension or not self.is_video_file(file_extension):
            logging.error("Invalid video file format.")
            return None

        try:
            s3.upload_fileobj(video_file, self.__BUCKET_NAME__, video_key, ExtraArgs={
                              'ContentType': f'video/{file_extension[1:]}'})
            video_url = f"https://{self.__BUCKET_NAME__}.s3.amazonaws.com/{video_key}"
            logging.info(
                f"Video uploaded to S3 successfully. URL: {video_url}")
            return video_url
        except FileNotFoundError:
            logging.error("Video file not found.")
            return None
        except NoCredentialsError:
            logging.error(
                "Credentials not available for uploading video to S3.")
            return None

    def save_incremental(self, post_id, data):
        dynamodb_resource = boto3.resource('dynamodb')
        table = dynamodb_resource.Table(self.__TABLE_NAME__)
        reaction = data['reaction']
        table.update_item(
            Key={'id': post_id},
            UpdateExpression=f'SET reactions.#reaction = reactions.#reaction + :incr',
            ExpressionAttributeNames={
                '#reaction': reaction,
            },
            ExpressionAttributeValues={
                ':incr': 1,
            },
        )

    def save_decremental(self, post_id, data):
        dynamodb_resource = boto3.resource('dynamodb')
        table = dynamodb_resource.Table(self.__TABLE_NAME__)
        reaction = data['reaction']
        table.update_item(
            Key={'id': post_id},
            UpdateExpression=f'SET reactions.#reaction = reactions.#reaction - :decr',
            ExpressionAttributeNames={
                '#reaction': reaction,
            },
            ExpressionAttributeValues={
                ':decr': 1,
            },
        )
