import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import DonationDto
from ..service.donation_service import (
    get_all_donations,
    create_donation,
    edit_donation
)


api = DonationDto.api
_donation = DonationDto.donation
page_donation = DonationDto.page_donation

@api.route('/')
class Donation(Resource):
    @api.doc('list_of_donation_campaigns')
    @api.marshal_with(_donation)
    def get(self):
        """List all donation campaigns"""
        return get_all_donations()
    
    @api.doc('create_donation')
    def post(self):
        data = request.json
        return create_donation(data)

@api.route('/<donation_id>')
@api.param('donation_id', 'The Donation identifier')
class DonationPost(Resource):
    @api.doc('edit campaign of donation')
    def put (self,donation_id):
        "Edit a comment on a post"
        data = request.json
        return edit_donation(donation_id, data)
    
   