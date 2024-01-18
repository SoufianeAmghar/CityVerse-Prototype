import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import EventDto
from ..service.event_service import (
    create_event,
    edit_event,
    delete_event,
    get_an_event,
    get_all_events,
    get_filtered_events
)


api = EventDto.api
_event = EventDto.event




@api.route('/')
class EventList(Resource):
    @api.doc('list_of_events')
    def get(self):
        """List all events"""
        return get_all_events()  # Implement get_all_events function in your service module

    @api.expect(_event, validate=True)
    @api.response(201, 'Event successfully created.')
    @api.doc('create a new event')
    def post(self):
        """Creates a new Event"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return create_event(data)


@api.route('/<event_id>')
@api.param('event_id', 'The Event identifier')
@api.response(404, 'Event not found.')
class Event(Resource):
    @api.doc('get an event')
    def get(self, event_id):
        """Get an event given its identifier"""
        event = get_an_event(event_id)  # Implement get_an_event function in your service module
        if not event:
            api.abort(404)
        else:
            return event

    @api.doc('Delete Event')
    def delete(self, event_id):
        """Delete an event given its identifier"""
        return delete_event(event_id)  # Implement delete_event function in your service module

    @api.response(201, 'Event successfully updated.')
    @api.doc('update event')
    def put(self, event_id):
        """Update an Event"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return edit_event(event_id, data)
    

@api.route('/search')
class EventList(Resource):
    @api.doc('list_of_events')
    def get(self):
        """List events by SGD"""
        data = request.json
        return get_filtered_events(data)  