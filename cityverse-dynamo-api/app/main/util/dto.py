from flask_restx import Namespace, fields

class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'id': fields.String(description='User Identifier'),
        'banner_image': fields.String(description='URL or file path for the user banner image'),
        'created_on': fields.String(description='Created on'),
        'email': fields.String(required=True, description='User email address'),
        'first_name': fields.String(required=True, description='User first name'),
        'hours_spent': fields.Float(description='Hours spent by the user'),
        'is_creator': fields.Boolean(description='Content creator or not'),
        'last_name': fields.String(required=True, description='User last name'),
        'modified_on': fields.String(description='Modified on'),
        'password': fields.String(required=True, description='User password'),
        'profile_image': fields.String(description='URL or file path for the user profile image'),
        'score': fields.Integer(description='User score'),
        'total_events_joined': fields.Integer(description='Total events joined by the user'),
        'total_places_joined': fields.Integer(description='Total places joined by the user'),
        'total_products_created': fields.Integer(description='Total products created by the user')
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
        'product_id': fields.String(description='Product identifier'),
        'created_on': fields.String(description='Post created on'),
        'modified_on': fields.String(description='Post modified on'),
        'created_by': fields.String(description='User ID who created the post'),
        'links': fields.List(fields.String, description='List of links'),
        'description': fields.String(description='Post description'),
        'reactions': fields.Raw(description='Map of reactions as numbers'),  # Use Raw to represent a map
        'reaction_emojis': fields.String(description='Dictionary mapping reactions to emojis')
    })

    product = api.model('product', {
        'id': fields.String(description='Product identifier'),
        'banner_image': fields.String(description='URL or file path for the product banner image'),
        'coordinate': fields.List(fields.Nested(coordinate), description='List of coordinates'),
        'created_by': fields.String(description='User ID who created the product'),
        'created_on': fields.String(description='Product created on'),
        'goal': fields.Integer(description='17 SDG number'),
        'modified_by': fields.String(description='User ID who modified the product'),
        'modified_on': fields.String(description='Product modified on'),
        'name': fields.String(description='Product name'),
        'profile_image': fields.String(description='URL or file path for the product profile image'),
        'type': fields.String(description='Product type (e.g., product, profile)')
    })

    page_product = api.model('product page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(product)),
    })

class PlaceDto:
    api = Namespace('place', description='place related operations')
    place = api.model('place', {
        'id': fields.String(description='Place Identifier'),
        'user_id': fields.String(description='User Identifier'),
        'goal': fields.Integer(description='17 SDG number'),
        'name': fields.String(description='Place Name'),
        'coordinate': fields.String(description='Place coordinates'),
        'created_on': fields.String(description='Created on'),
        'modified_on': fields.String(description='Modified on')
    })

    page_place = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(place)),
    })

class EventDto:
    api = Namespace('event', description='event related operations')
    event = api.model('event', {
        'id': fields.String(description='Event Identifier'),
        'user_id': fields.String(description='User Identifier'),
        'goal': fields.Integer(description='17 SDG number'),
        'name': fields.String(description='Event Name'),
        'coordinate': fields.String(description='Event coordinates'),
        'date': fields.String(description='Event date'),
        'description': fields.String(description='Event description'),
        'created_on': fields.String(description='Created on'),
        'modified_on': fields.String(description='Modified on')
    })

    page_event = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(event)),
    })

class BadgeDto:
    api = Namespace('badge', description='badge related operations')
    badge = api.model('badge', {
        'id': fields.String(description='Badge Identifier'),
        'user_id': fields.String(description='User Identifier'),
        'name': fields.String(description='Badge Name'),
        'coordinate': fields.String(description='Badge coordinates'),
        'description': fields.String(description='Badge description'),
        'created_on': fields.String(description='Created on'),
        'modified_on': fields.String(description='Modified on')
    })

    page_badge = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(badge)),
    })


