from flask_restx import Namespace, fields

class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'first_name': fields.String(required=True, description='User first name'),
        'last_name': fields.String(required=True, description='User last name'),
        'email': fields.String(required=True, description='User email address'),
        'password': fields.String(required=True, description='User password'),
        'created_on': fields.String(description='Created on'),
        'modified_on': fields.String(description='Modified on'),
        # 'admin': fields.Boolean(description='Admin status'),
        # 'role': fields.String(description='User role'),
        'id': fields.String(description='User Identifier')
    })

    page_user = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(user)),
    })


