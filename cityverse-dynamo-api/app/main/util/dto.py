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
        'interest_points_id': fields.List(fields.String, description='Points of interest IDs linked to another product DTO', allow_null=True),
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

class ProductDto:
    api = Namespace('product', description='product related operations')
    coordinate = api.model('coordinate', {
        'x': fields.String(description='X coordinate'),
        'y': fields.String(description='Y coordinate'),
        'distances': fields.String(description='Distances from user/location'),
        'diff_address': fields.String(description='Different address')
    })

    reaction_emojis = {
        'like': '👍',
        'love': '❤️',
        'haha': '😄',
        'wow': '😮',
        'sad': '😢',
        'angry': '😡'
    }

    post = api.model('post', {
        'id': fields.String(description='Post identifier'),
        'created_on': fields.String(description='Post created on'),
        'modified_on': fields.String(description='Post modified on'),
        'created_by': fields.String(description='User ID who created the post'),
        'links': fields.List(fields.String, description='List of links'),
        'description': fields.String(description='Post description'),
        'reactions': fields.List(fields.String(enum=list(reaction_emojis.keys())), description='Array of reactions'),
        'reaction_emojis': fields.String(description='Dictionary mapping reactions to emojis')
    })

    product = api.model('product', {
        'id': fields.String(description='Product identifier'),
        'banner_image': fields.String(description='URL or file path for the product banner image'),
        'coordinate': fields.List(fields.Nested(coordinate), description='List of coordinates'),
        'created_by': fields.String(description='User ID who created the product'),
        'created_on': fields.String(description='Product created on'),
        'modified_by': fields.String(description='User ID who modified the product'),
        'modified_on': fields.String(description='Product modified on'),
        'name': fields.String(description='Product name'),
        'posts': fields.List(fields.Nested(post), description='List of posts'),
        'profile_image': fields.String(description='URL or file path for the product profile image'),
        'type': fields.String(description='Product type (e.g., product, profile)')
    })

    page_product = api.model('product page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(product)),
    })


