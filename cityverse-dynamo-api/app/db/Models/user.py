from datetime import datetime, timedelta
import uuid
import jwt
# Ensure the correct import path
from app.db.Models.black_list_token import BlacklistToken
from app.db.dynamodb_document import Document
from app.main import flask_bcrypt
from app.main.config import key
import logging


class User(Document):
    __TABLE_NAME__ = "User"  # Specify the DynamoDB table name

    def __init__(self, table_name='User', **kwargs):
        super().__init__(table_name=table_name, **kwargs)

    email = None
    password_hash = None
    first_name = None
    last_name = None
    created_on = None
    modified_on = None
    is_creator = None
    score = None
    total_products_created = None
    total_events_joined = None
    total_places_joined = None
    address = None
    address_coordinates = None
    profile_image = None
    banner_image = None
    description = None
    social_links = None

    @staticmethod
    def parse_datetime(date_str):
        formats = ['%Y-%m-%dT%H:%M:%S.%f', '%Y-%m-%d %H:%M:%S.%f']
    
        for format_str in formats:
          try:
            return datetime.strptime(date_str, format_str)
          except ValueError:
            pass


        raise ValueError("Unsupported date-time format")

    @staticmethod
    def calculate_hours_spent(user):
       
        last_login_time = datetime.utcnow()
        hours_spent = 0
        try:
            last_login_str = user.get('last_login', user['created_on'])
            last_login_time = User.parse_datetime(last_login_str)
            current_time = datetime.utcnow()
            hours_spent_this_session = round((current_time - last_login_time).total_seconds() / 3600)
           # logging.info('Hours spent: %s', hours_spent_this_session)
            existing_hours_spent = int(user.get('hours_spent', 0))
            hours_spent = existing_hours_spent + hours_spent_this_session
        except ValueError as e:
            print(f"Error parsing date string: {e}")
            # Handle the error or log it as needed

        return hours_spent

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(
            password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def encode_auth_token(user_id, days=1, seconds=5, minutes=0):
        try:
            unique_id = str(uuid.uuid4())
            payload = {
                'exp': datetime.utcnow() + timedelta(days=days, seconds=seconds, minutes=minutes),
                'iat': datetime.utcnow(),
                'sub': user_id,
                'jti': unique_id
            }
            return jwt.encode(
                payload,
                key,
                algorithm='HS256'
            ).decode('utf-8')
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token, table_name):

        try:
            payload = jwt.decode(auth_token, key, algorithms=['HS256'])
            token_data = {
                'token': payload['sub'], 'exp': payload['exp'], 'jti': payload.get('jti')}
            is_blacklisted_token = BlacklistToken.check_blacklist(
                token_data['jti'], table_name)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return dict(token=payload['sub'])
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def __repr__(self):
        return "<User '{} {}'>".format(self.first_name, self.last_name)
