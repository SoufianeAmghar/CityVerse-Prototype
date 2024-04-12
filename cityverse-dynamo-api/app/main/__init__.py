from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os
import base64

from .config import config_by_name

flask_bcrypt = Bcrypt()

def generate_jwt_key(length=32):
    key_bytes = os.urandom(length)
    key_base64 = base64.urlsafe_b64encode(key_bytes)
    return key_base64.decode('utf-8')

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    CORS(app)

    flask_bcrypt.init_app(app)

    # Generate JWT key if not already set in the config
    if not app.config.get('SECRET_KEY'):
        app.config['SECRET_KEY'] = generate_jwt_key()

    return app