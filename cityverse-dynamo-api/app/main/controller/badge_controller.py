import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import BadgeDto
from ..service.badge_service import (
    create_badge,
    edit_badge,
    delete_badge,
    get_a_badge,
    get_all_badges
)


api = BadgeDto.api
_badge = BadgeDto.badge




@api.route('/')
class BadgeList(Resource):
    @api.doc('list_of_badges')
    def get(self):
        """List all badges"""
        return get_all_badges()  # Implement get_all_badges function in your service module

    @api.expect(_badge, validate=True)
    @api.response(201, 'badge successfully created.')
    @api.doc('create a new badge')
    def post(self):
        """Creates a new badge"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return create_badge(data)


@api.route('/<badge_id>')
@api.param('badge_id', 'The badge identifier')
@api.response(404, 'badge not found.')
class badge(Resource):
    @api.doc('get an badge')
    def get(self, badge_id):
        """Get an badge given its identifier"""
        badge = get_a_badge(badge_id)  # Implement get_an_badge function in your service module
        if not badge:
            api.abort(404)
        else:
            return badge

    @api.doc('Delete badge')
    def delete(self, badge_id):
        """Delete an badge given its identifier"""
        return delete_badge(badge_id)  # Implement delete_badge function in your service module

    @api.response(201, 'badge successfully updated.')
    @api.doc('update badge')
    def put(self, badge_id):
        """Update an badge"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return edit_badge(badge_id, data)
    