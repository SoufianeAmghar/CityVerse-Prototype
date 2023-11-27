
from boto3.dynamodb.conditions import Key
import boto3
from ...db.Models.user import User
import logging
import json
from decimal import Decimal
from ..service.blacklist_service import save_token
from ..service.user_service import save_new_user

dynamodb = boto3.resource('dynamodb')
table_name = 'User'
table = dynamodb.Table(table_name)


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)


class Auth:

    @staticmethod
    def signup_user(data):
        try:
            # Check if data is None
            if data is None:
                response_object = {
                    'status': 'fail',
                    'message': 'Invalid data provided for registration'
                }
                return response_object, 400
            response, status_code = save_new_user(data)
            if response['status'] == 'fail':
                response_object = {
                    'status': 'fail',
                    'message': response['message']
                }
                return response_object, status_code
            else:
                response_object = {
                    'status': 'success',
                    'message': response['message']
                }
                return response_object, status_code
        except Exception as e:
            logging.error(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def login_user(data):

        try:
            if data is None:
                response_object = {
                    'status': 'fail',
                    'message': 'Invalid data provided for login.'
                }
                return response_object, 400
            # fetch the user data
            response = table.query(
                IndexName='email-index',
                KeyConditionExpression=Key('email').eq(data.get('email'))
            )

            user_list = response.get('Items', [])

            # Check if user_list is not empty
            if user_list:
                user = user_list[0]
            else:
                user = None

            if user and user['id'] and user['password'] == data.get('password'):
                auth_token = User.encode_auth_token(user['id'])
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'Authorization': auth_token.decode(),
                        'data': {
                            'id': user['id'],
                            'email': user['email'],
                            'last_name': user['last_name'],
                            'first_name': user['first_name'],
                            'created_on': str(user['created_on']),
                            'is_creator': user['is_creator'],
                            'interest_points': None
                        }
                    }
                    if 'interest_points' in user and user['interest_points'] is not None:
                        response_object['data']['interest_points'] = json.loads(
                            json.dumps(user['interest_points'],
                                       cls=DecimalEncoder)
                        )
                    # Interest points transformation
                        response_object['data']['interest_points'] = [
                            {
                                'area_name': response_object['data']['interest_points'][i],
                                'coordinates': [
                                    (
                                        float(
                                            response_object['data']['interest_points'][i + 1][j]),
                                        float(
                                            response_object['data']['interest_points'][i + 1][j + 1])
                                    )
                                    for j in range(0, len(response_object['data']['interest_points'][i + 1]), 2)
                                ]
                            }
                            for i in range(0, len(response_object['data']['interest_points']), 2)
                        ]

                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            logging.error(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def verify_token(new_request):
        data = new_request.headers.get('Authorization')
        if data:
            auth_token = data
        else:
            auth_token = ''

        if auth_token:
            check_token = User.decode_auth_token(auth_token, table_name)

            if check_token['token']:
                return True
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Token tampered'
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token'
            }

        return response_object, 403

    @staticmethod
    def logout_user(new_request):
        data = new_request.headers.get('Authorization')
        if data:
            auth_token = data
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token, table_name)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                return save_token(token=resp['token'])
            else:
                response_object = {
                    'status': 'fail',
                    'message': resp
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        auth_token = new_request.headers.get('Authorization')
        table = 'Blacklist'
        if auth_token:
            resp = User.decode_auth_token(auth_token, table)
            if not isinstance(resp, str):
                user = User(table_name='User')
                id = resp['token']
                user.load(dynamodb_client=boto3.client(
                    'dynamodb'), query={'id': {'S': id}})
                # TODO CHANGE THIS
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': user.id,
                        'email': user.email,
                        'last_name': user.last_name,
                        'first_name': user.first_name,
                        'created_on': str(user.created_on),
                        'is_creator': user.is_creator,
                        'interest_points': user.interest_points if user.interest_points is not None else None
                    }
                }
                return response_object, 200
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 401
