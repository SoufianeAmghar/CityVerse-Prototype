from flask_restx import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
# from .main.controller.profile_controller import api as userprofile_ns


blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='CityVerse-V:1.0',
          version='1.0',
          description='CityVerse REST API'
          )

# api.add_namespace(userprofile_ns, path='/profiles')
api.add_namespace(user_ns, path='/user')
