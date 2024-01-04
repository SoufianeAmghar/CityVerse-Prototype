import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import UserDto
from ..service.user_service import join_product, save_new_user, get_all_users, get_a_user, delete_user, unjoin_product, update_user, update_password, get_user_by_email

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
    
    @api.response(201, 'User successfully updated.')
    @api.doc('update user')
    def put(self,public_id):
        """Update a User"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        image_file = request.files.get('profile_image')
        return update_user(public_id,data,profile_image=image_file)
    
    @api.response(201, 'User successfully joined a product.')
    @api.doc('join product')
    def post(self, public_id):
        """Join a product"""
        data = request.json
        product_id = data.get('product_id')

        if not product_id:
            return {
                'status': 'fail',
                'message': 'Product ID is required for joining.',
            }, 400

        return join_product(public_id, product_id)
    
    @api.response(201, 'User successfully removed a product.')
    @api.doc('unjoin product')
    def delete(self, public_id):
        """Unjoin a product"""
        data = request.json
        product_id = data.get('product_id')

        if not product_id:
            return {
                'status': 'fail',
                'message': 'Product ID is required for joining.',
            }, 400

        return unjoin_product(public_id, product_id)


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
