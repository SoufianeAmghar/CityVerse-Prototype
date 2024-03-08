from flask_restx import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    color_info = api.model('color_info', {
        'hex': fields.String,
        'rgb': fields.List(fields.Integer),
    })

    keywords = api.model('keywords', {
        'descriptions': fields.List(fields.String),
        'groups': fields.List(fields.String),
        'tags': fields.List(fields.String),
    })

    sdg = api.model('sdg', {
        'colorInfo': fields.Nested(color_info),
        'goal': fields.Integer,
        'icon_url': fields.String,
        'keywords': fields.Nested(keywords),
        'short': fields.String,
        'title': fields.String,
    })
    user = api.model('user', {
        'id': fields.String(description='User Identifier'),
        'created_on': fields.String(description='Created on'),
        'email': fields.String(required=True, description='User email address'),
        'first_name': fields.String(required=True, description='User first name'),
        'hours_spent': fields.Float(description='Hours spent by the user'),
        'is_creator': fields.Boolean(description='Content creator or not'),
        'last_name': fields.String(required=True, description='User last name'),
        'modified_on': fields.String(description='Modified on'),
        'password': fields.String(required=True, description='User password'),
        'profile_image': fields.String(description='URL or file path for the user profile image'),
        'sdg': fields.List(fields.Nested(sdg), description='List of SDGs'),
        'banner_image': fields.String(description='URL or file path for the user banner image'),
        'description': fields.String(description='User description'),
        'social_links': fields.List(fields.String, description='List of links'),
        'score': fields.Integer(description='User score'),
        'total_events_joined': fields.Integer(description='Total events joined by the user'),
        'total_places_joined': fields.Integer(description='Total places joined by the user'),
        'total_products_created': fields.Integer(description='Total products created by the user'),
        'address': fields.String(description='User address'),
        'address_coordinates': fields.List(fields.String, description='Coordinates of the user address')
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


class GoalDto:
    api = Namespace('goal', description='goal related operations')

    goal_details = api.model('goal_details', {
        'goal': fields.Integer(required=True, description='The goal number'),
        'title': fields.String(required=True, description='The goal title'),
        'short': fields.String(required=True, description='The short name for the goal'),
        'colorInfo': fields.Nested(api.model('color_info', {
            'hex': fields.String(required=True, description='Hex color code'),
            'rgb': fields.List(fields.Integer, required=True, description='RGB color code')
        }), required=True, description='Color information'),
        'keywords': fields.Nested(api.model('keywords', {
            'tags': fields.List(fields.String, required=True, description='List of tags'),
            'descriptions': fields.List(fields.String, required=True, description='List of descriptions'),
            'groups': fields.List(fields.String, required=True, description='List of groups')
        }), required=True, description='Keywords information'),
        'icon_url': fields.String(required=True, description='URL of the goal icon')
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
        'creator_id': fields.String(description='Product or Association identifier'),
        'created_on': fields.String(description='Post created on'),
        'modified_on': fields.String(description='Post modified on'),
        'created_by': fields.String(description='User ID who created the post'),
        'links': fields.List(fields.String, description='List of links'),
        'description': fields.String(description='Post description'),
        # Use Raw to represent a map
        'reactions': fields.Raw(description='Map of reactions as numbers'),
        'reaction_emojis': fields.String(description='Dictionary mapping reactions to emojis'),
        'comments': fields.List(fields.String,description='Comments on post')
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


class AssociationDto:
    api = Namespace(
        'association', description='association related operations')

    color_info = api.model('color_info', {
        'hex': fields.String,
        'rgb': fields.List(fields.Integer),
    })

    keywords = api.model('keywords', {
        'descriptions': fields.List(fields.String),
        'groups': fields.List(fields.String),
        'tags': fields.List(fields.String),
    })

    sdg = api.model('sdg', {
        'colorInfo': fields.Nested(color_info),
        'goal': fields.Integer,
        'icon_url': fields.String,
        'keywords': fields.Nested(keywords),
        'short': fields.String,
        'title': fields.String,
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
    })

    association = api.model('association', {
        'id': fields.String(description='Association Identifier'),
        'created_by': fields.String(description='User Identifier', required=True),
        'name': fields.String(description='Association Name', required=True),
        'sdg': fields.List(fields.Nested(sdg), description='List of SDGs'),
        'description': fields.String(description='Association Description'),
        'activity': fields.List(fields.String, description='Association activities', required=True),
        'rna': fields.String(description='Association RNA number', required=True),
        'siege': fields.String(description='siege information', required=True),
        'siege_coordinates': fields.List(fields.String, description='siege coordinates'),
        'links': fields.List(fields.String, description='List of links'),
        'banner_image': fields.String(description='URL or file path for the product banner image'),
        'profile_image': fields.String(description='URL or file path for the product profile image'),
        'created_on': fields.String(description='Created on'),
        'modified_on': fields.String(description='Modified on')
    })

    page_association = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(association)),
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

class FeedDto:
    api = Namespace('feed', description='user feed related operations')

    # reaction_emojis = {
    #     'like': '👍',
    #     'love': '❤️',
    #     'haha': '😄',
    #     'wow': '😮',
    #     'sad': '😢',
    #     'angry': '😡'
    # }

    post = api.model('post', {
        'post': fields.Nested(ProductDto.post, description='Post details'),
        # 'is_liked': fields.Boolean(description='Indicates if the user liked the post'),
        # # Use Raw to represent a map
        # 'reactions': fields.Raw(description='Map of reactions as numbers'),
        # 'reaction_emojis': fields.String(description='Dictionary mapping reactions to emojis')
    })

    feed_response = api.model('feed_response', {
        'posts': fields.List(fields.Nested(post), description='List of posts from followed associations'),
        # 'filters': fields.Dict(description='Dictionary of available filters (e.g., {"date_from": "2024-01-01", "association_type": "NGO"})'),
        
    })

    page_feed = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(feed_response)),
    })

class MissionDto:
    api = Namespace('mission', description='Mission related operations')

    mission = api.model('mission', {
        'id': fields.String(description='Mission Identifier'),
        'duration': fields.String(description='Mission Duration'),
        'start_date': fields.String(description='Mission Start Date'),
        'description': fields.String(description='Mission Description'),
        'type': fields.String(description='Type of Mission'),
        'volunteer_qualifications': fields.String(description='Volunteer Qualifications'),
        'number_of_participants': fields.Integer(description='Number of Participants'),
        'approved_applications': fields.Integer(description='Approved Applications Number'),
        'status': fields.String(description='Mission Status')
    })

    page_mission = api.model('mission_page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(mission)),
    })

class ApplicationDto:
    api = Namespace('application', description='Application related operations')

    application = api.model('application', {
        'id': fields.String(description='Application Identifier'),
        'user_id': fields.String(description='User Identifier'),
        'mission_id': fields.String(description='Mission Identifier'),
        'has_a_car': fields.Boolean(description='Has a Car'),
        'permit': fields.Boolean(description='Driving license ownership'),
        'interests': fields.String(description='Interests'),                       
        'status': fields.String(description='Application Status')
    })

    page_application = api.model('application_page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(application)),
    })
