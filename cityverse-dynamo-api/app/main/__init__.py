from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import boto3

from .config import config_by_name

flask_bcrypt = Bcrypt()
dynamodb_client = boto3.client('dynamodb')

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    CORS(app)

    flask_bcrypt.init_app(app)

    return app, dynamodb_client