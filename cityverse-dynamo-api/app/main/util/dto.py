from flask_restx import Namespace, fields

class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'profile_image': fields.String(description='URL or file path for the user profile image'),
        'first_name': fields.String(required=True, description='User first name'),
        'last_name': fields.String(required=True, description='User last name'),
        'email': fields.String(required=True, description='User email address'),
        'password': fields.String(required=True, description='User password'),
        'created_on': fields.String(description='Created on'),
        'modified_on': fields.String(description='Modified on'),
        'is_creator': fields.Boolean(description='Content creator or not'),
        'interest_points': fields.List(fields.Raw, description='Points of interest', allow_null=True),
        'id': fields.String(description='User Identifier')
    })

    page_user = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(user)),
    })

class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })


