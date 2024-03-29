import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import DonationDto, ContributionDto
from ..service.donation_service import (
    get_all_donations,
    create_donation,
    edit_donation,
    donate,
    get_donations_for_donation
)


api = DonationDto.api
_donation = DonationDto.donation
page_donation = DonationDto.page_donation
_contribution = ContributionDto.contribution

@api.route('/')
class Donation(Resource):
    @api.doc('list_of_donation_campaigns')
    @api.marshal_with(_donation)
    def get(self):
        """List all donation campaigns"""
        return get_all_donations()
    
    @api.doc('create_donation')
    def post(self):
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        img_files = request.files.getlist('img')
        video_files = request.files.getlist('video')
        return create_donation(data,img_files,video_files)

@api.route('/<donation_id>')
@api.param('donation_id', 'The Donation identifier')
class DonationPost(Resource):
    @api.doc('edit campaign of donation')
    def put (self,donation_id):
        "Edit a comment on a post"
        data = request.json
        return edit_donation(donation_id, data)

@api.route('/donate/<donation_id>')
@api.param('donation_id', 'The Mission identifier')
class ApplyForDonation(Resource):
    @api.expect(_contribution, validate=True)
    @api.response(201, 'Contribution successfully added.')
    @api.doc('contribute to donation campaign')
    def post(self,donation_id):
        """Apply for a mission"""
        data = request.json
        return donate(donation_id,data)

@api.route('/donations/<donation_id>')
@api.param('donation_id', 'The Donation identifier')
class DonationsForDonationCampaign(Resource):
    @api.doc('get_applications_for_mission')
    @api.marshal_with(_contribution)
    def get(self, donation_id):
        """Get all applications for a mission"""
        return get_donations_for_donation(donation_id)
    
   