from flask_restx import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.product_controller import api as product_ns


blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='CityVerse-V:1.0',
          version='1.0',
          description='CityVerse REST API'
          )

api.add_namespace(product_ns, path='/products')
api.add_namespace(auth_ns, path='/auth')
api.add_namespace(user_ns, path='/user')
