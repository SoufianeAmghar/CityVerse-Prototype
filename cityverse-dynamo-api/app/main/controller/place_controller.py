import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import PlaceDto
from ..service.place_service import (
    create_place,
    edit_place,
    delete_place,
    get_a_place,
    get_all_places,
    get_filtered_places
)

api = PlaceDto.api
_place = PlaceDto.place


@api.route('/')
class PlaceList(Resource):
    @api.doc('list_of_places')
    def get(self):
        """List all places"""
        return get_all_places()  # Implement get_all_places function in your service module

    @api.expect(_place, validate=True)
    @api.response(201, 'Place successfully created.')
    @api.doc('create a new place')
    def post(self):
        """Creates a new Place"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return create_place(data)


@api.route('/<place_id>')
@api.param('place_id', 'The Place identifier')
@api.response(404, 'Place not found.')
class Place(Resource):
    @api.doc('get a place')
    def get(self, place_id):
        """Get a place given its identifier"""
        place = get_a_place(place_id)  # Implement get_a_place function in your service module
        if not place:
            api.abort(404)
        else:
            return place

    @api.doc('Delete Place')
    def delete(self, place_id):
        """Delete a place given its identifier"""
        return delete_place(place_id)  

    @api.response(201, 'Place successfully updated.')
    @api.doc('update place')
    def put(self, place_id):
        """Update a Place"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return edit_place(place_id, data)
    

@api.route('/search')
class PlaceList(Resource):
    @api.doc('list_of_places')
    def get(self):
        """List places by SGD"""
        data = request.json
        return get_filtered_places(data)  # Implement get_all_places function in your service module

