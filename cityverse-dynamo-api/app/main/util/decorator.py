from functools import wraps
from app.main.service.auth_helper import Auth

from flask import request



def token_required(authority=None, admin=False):
    def authority_decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            data, status = Auth.get_logged_in_user(request)

            if data['status'] == 'fail':
                return data

            if data.get('data')['role']:
                authorities = data.get('data')['role']['sites']
            is_admin = data.get('data')['admin']

            token = data.get('data')
            if not token:
                return data, status

            if admin and not is_admin:
                response_object = {
                'status': 'fail',
                'message': 'UNAUTHORIZER ACCESS: NOT ADMIN.'
                }
                return response_object, 401

            if (authority is not None) and (not authority in authorities):
                response_object = {
                    'status': 'fail',
                    'message': 'Access denied.'
                }
                return response_object, 401

            return f(*args, **kwargs)

        return decorated

    return authority_decorator


def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        data, status = Auth.get_logged_in_user(request)
        token = data.get('data')

        if not token:
            return data, status

        admin = token.get('admin')
        if not admin:
            response_object = {
                'status': 'fail',
                'message': 'admin token required'
            }
            return response_object, 401

        return f(*args, **kwargs)

    return decorated