from flask import request
from flask_restplus import Resource

from app.main.service.auth_helper import Auth
from ..util.decorator import token_required
from ..util.dto import AuthDto, UserDto

api = AuthDto.api
user_auth = AuthDto.user_auth
user = UserDto.user

@api.route('/signup')
class UserLogin(Resource):
    """
        User Login Resource
    """
    @api.doc('user sign up')
    @api.expect(user, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.signup_user(data=post_data)
    
@api.route('/login')
class UserLogin(Resource):
    """
        User Login Resource
    """
    @api.doc('user login')
    @api.expect(user_auth, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.login_user(data=post_data)


@api.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """
    @api.doc('logout a user')
    def post(self):
        # get auth token
        return Auth.logout_user(request)


@api.route('/info')
class InfoAPI(Resource):
    """
    Logout Resource
    """
    @api.doc('Get logged in user')
    def get(self):
        return Auth.get_logged_in_user(request)
    
@api.route('/verify-token')
class UserToken(Resource):
    """
    Token Resource
    """
    @api.doc('Verify user token')
    def post(self):
        # get auth token
        return Auth.verify_token(request)