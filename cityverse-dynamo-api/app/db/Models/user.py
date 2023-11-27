import datetime
import uuid
import jwt
from app.db.Models.black_list_token import BlacklistToken  # Ensure the correct import path
from app.db.dynamodb_document import Document
from app.main import flask_bcrypt
from app.main.config import key

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

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def encode_auth_token(user_id, days=1, seconds=5, minutes=0):
        try:
            unique_id = str(uuid.uuid4()) 
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=days, seconds=seconds, minutes=minutes),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id,
                'jti': unique_id
            }
            return jwt.encode(
                payload,
                key,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token, table_name):

        try:
            payload = jwt.decode(auth_token, key, algorithms=['HS256'])
            token_data = {'token': payload['sub'], 'exp': payload['exp'], 'jti': payload.get('jti')}
            is_blacklisted_token = BlacklistToken.check_blacklist(token_data['jti'], table_name)
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
