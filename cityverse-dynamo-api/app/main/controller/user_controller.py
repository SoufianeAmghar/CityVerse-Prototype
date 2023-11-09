from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import UserDto
from ..service.user_service import save_new_user, get_all_users, get_a_user, delete_user, update_user, update_password, get_user_by_email

api = UserDto.api
_user = UserDto.user

@api.route('/')
class UserList(Resource):
    @api.doc('list_of_registered_users')
   
    def get(self):
        """List all registered users"""
        return get_all_users()

    @api.expect(_user, validate=True)
    @api.response(201, 'User successfully created.')
    
    @api.doc('create a new user')
    def post(self):
        """Creates a new User"""
        data = request.json
        return save_new_user(data)

    @api.expect(_user, validate=True)
    @api.response(201, 'User successfully updated.')
    
    @api.doc('update user')
    def put(self):
        """Update a User"""
        data = request.json
        return update_user(data)

@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    
    def get(self, public_id):
        """Get a user given its identifier"""
        user = get_a_user(public_id)
        if not user:
            api.abort(404)
        else:
            return user

    @api.doc('Delete User')
    
    def delete(self, public_id):
        """Delete a user given its identifier"""
        return delete_user(public_id)

@api.route('/change-password')
class UserPassword(Resource):
    
    @api.doc('Reset password')
    def put(self):
        return update_password(request)

@api.route('/search')
class UserMail(Resource):
    
    @api.doc('get a user by email')
    @api.response(201, 'User Found')
    def post(self):
        """Get a user given its email"""
        data = request.json
        return get_user_by_email(data.get('email'))
