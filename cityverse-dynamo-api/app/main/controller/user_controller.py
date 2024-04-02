import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import UserDto, DonationDto
from ..service.user_service import save_new_user, get_all_users, get_a_user, delete_user, update_user, update_user_description, update_user_banner, update_password, get_user_by_email, add_user_event, add_user_place, update_user_social, update_user_sdg, update_user_profile, follow_association, unfollow_association, get_user_missions, update_user_badge, get_user_donations
import logging

api = UserDto.api
_user = UserDto.user
_donation = DonationDto.donation

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


@api.route('/')
class UserList(Resource):
    @api.doc('list_of_registered_users')
    def get(self):
        """List all registered users"""
        return get_all_users()

    @api.expect(_user, validate=True)

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
    def put(self, public_id):
        """Update a User"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        image_file = request.files.get('profile_image')
        return update_user(public_id, data, profile_image=image_file)


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
    

@api.route('/description/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class UserDescriptionResource(Resource):
    @api.response(201, 'User Description successfully updated.')
    @api.doc('update user description')
    def put(self, public_id):
        """Update a User's description"""
        data = request.json
        return update_user_description(public_id, data)
    
@api.route('/profile/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class UserProfileResource(Resource):
    @api.response(201, 'User profile successfully changed.')
    @api.doc('update user profile')
    def put(self, public_id):
        """Update a User's banner"""
        profile_file = request.files.get('profile_image')
        return update_user_profile(public_id, profile_file)


@api.route('/banner/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class UserBannerResource(Resource):
    @api.response(201, 'User Banner successfully changed.')
    @api.doc('update user banner')
    def put(self, public_id):
        """Update a User's banner"""
        banner_file = request.files.get('banner_image')
        return update_user_banner(public_id, banner_file)
    
@api.route('/social/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class UserSocialResource(Resource):
    @api.response(201, 'User social links successfully changed.')
    @api.doc('update user social links')
    def put(self, public_id):
        """Update a User's banner"""
        data = request.json
        return update_user_social(public_id, data)
    
@api.route('/sdg/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class UserSocialResource(Resource):
    @api.response(201, 'User sdgs successfully changed.')
    @api.doc('update user sdg')
    def put(self, public_id):
        """Update a User's banner"""
        data = request.json
        return update_user_sdg(public_id, data)


@api.route('/places/<place_id>')
@api.param('place_id', 'The Place identifier')
class UserPlaceResource(Resource):
    @api.response(201, 'User Place successfully added.')
    @api.doc('update user place')
    def put(self, public_id, place_id):
        return add_user_place(public_id, place_id)


@api.route('/events/<event_id>')
@api.param('event_id', 'The Event identifier')
class UserEventResource(Resource):
    @api.response(201, 'User Event successfully added.')
    @api.doc('update user event')
    def put(self, public_id, event_id):
        """Update a User's event"""
        return add_user_event(public_id, event_id)
    
@api.route('/<public_id>/follow/<association_id>')
@api.param('public_id', 'The Public identifier of the user')
@api.param('association_id', 'The Association identifier')
class UserFollowResource(Resource):
    @api.response(201, 'Association successfully followed.')
    @api.doc('update user event')
    def put(self, public_id, association_id):
        """Update a User's event"""
        data = request.json
        return follow_association(public_id, association_id,data)
    
@api.route('/<public_id>/unfollow/<association_id>')
@api.param('public_id', 'The Public identifier of the user')
@api.param('association_id', 'The Association identifier')
class UserUnfollowResource(Resource):
    @api.response(204, 'Association successfully unfollowed.')
    @api.doc('update user event')
    def put(self, public_id, association_id):
        """Update a User's event to unfollow an association"""
        data = request.json
        return unfollow_association(public_id, association_id,data)

@api.route('/<public_id>/missions')
@api.param('public_id', 'The Public identifier of the user')
class UserMissionResource(Resource):
    @api.response(204, 'Missions successfully retrieved')
    @api.doc('get user missions')
    def get(self, public_id):
       
        return get_user_missions(public_id)
    
@api.route('/<public_id>/donations')
@api.param('public_id', 'The Public identifier of the user')
class UserDonationResource(Resource):
    @api.response(204, 'Donations successfully retrieved')
    @api.doc('get user donations')
    @api.marshal_with(_donation)
    def get(self, public_id):
       
        return get_user_donations(public_id)

@api.route('/<public_id>/badge')
class UserBadgeResource(Resource):
    @api.response(201, 'User Badge successfully changed.')
    @api.doc('update user badge')
    def put(self, public_id):
        """Update a User's badge"""
        return update_user_badge(public_id)
