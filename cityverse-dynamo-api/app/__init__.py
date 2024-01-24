from flask_restx import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.product_controller import api as product_ns
from .main.controller.association_controller import api as association_ns
from .main.controller.event_controller import api as event_ns
from .main.controller.badge_controller import api as badge_ns
from .main.controller.goal_controller import api as goal_ns



blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='CityVerse-V:1.0',
          version='1.0',
          description='CityVerse REST API'
          )

api.add_namespace(product_ns, path='/products')
api.add_namespace(auth_ns, path='/auth')
api.add_namespace(user_ns, path='/user')
api.add_namespace(association_ns, path='/association')
api.add_namespace(event_ns, path='/event')
api.add_namespace(badge_ns, path='/badge')
api.add_namespace(goal_ns, path='/goal')
