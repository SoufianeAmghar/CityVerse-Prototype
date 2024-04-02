from app.db.dynamodb_document import Document
from botocore.exceptions import NoCredentialsError
import datetime
import logging


class BlacklistToken:
    """
    Token Model for storing JWT tokens
    """
    __TABLE_NAME__ = "Blacklist"  # Specify the DynamoDB table name

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
            self.blacklisted_on = datetime.datetime.fromisoformat(
                d['blacklisted_on'])
        else:
            self._id = None

    @staticmethod
    def check_blacklist(token_id, table_name):
        blacklist_document = Document(__TABLE_NAME__=table_name)
        response = blacklist_document.get_token(token_id)
        return bool(response)
       