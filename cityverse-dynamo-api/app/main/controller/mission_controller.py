import json
from flask import request
from flask_restplus import Resource
from app.main.util.decorator import token_required
from ..util.dto import MissionDto, ApplicationDto
from ..service.mission_service import (
    create_mission,
    edit_mission,
    delete_mission,
    get_mission,
    get_all_missions
)
from ..service.application_service import (
    apply_for_mission,
    get_applications_for_mission,
    approve_application
)

api = MissionDto.api
_mission = MissionDto.mission
_application = ApplicationDto.application

@api.route('/')
class MissionList(Resource):
    @api.doc('list_of_missions')
    def get(self):
        """List all missions"""
        return get_all_missions()  

    @api.expect(_mission, validate=True)
    @api.response(201, 'Mission successfully created.')
    @api.doc('create a new mission')
    def post(self):
        """Creates a new Mission""" 
        data = request.json
        return create_mission(data)


@api.route('/<mission_id>')
@api.param('mission_id', 'The Mission identifier')
@api.response(404, 'Mission not found.')
class Mission(Resource):
    @api.doc('get a mission')
    def get(self, mission_id):
        """Get a mission given its identifier"""
        mission = get_mission(mission_id) 
        if not mission:
            api.abort(404)
        else:
            return mission

    @api.doc('Delete Mission')
    def delete(self, mission_id):
        """Delete a mission given its identifier"""
        return delete_mission(mission_id)  

    @api.response(201, 'Mission successfully updated.')
    @api.doc('update mission')
    def put(self, mission_id):
        """Update a Mission"""
        data = request.json
        return edit_mission(mission_id, data)
    

@api.route('/apply/<mission_id>')
@api.param('mission_id', 'The Mission identifier')
class ApplyForMission(Resource):
    @api.expect(_application, validate=True)
    @api.response(201, 'Application successfully created.')
    @api.doc('apply for a mission')
    def post(self,mission_id):
        """Apply for a mission"""
        data = request.json
        return apply_for_mission(mission_id,data)
    
@api.route('/application/<application_id>')
@api.param('application_id', 'The Application identifier')
class ApproveApplication(Resource):
    @api.expect(_application, validate=True)
    @api.response(201, 'Application successfully approved.')
    @api.doc('apply for a mission')
    def put(self,application_id):
        """Apply for a mission"""
        data = request.json
        return approve_application(application_id,data)


@api.route('/applications/<mission_id>')
@api.param('mission_id', 'The Mission identifier')
class MissionApplications(Resource):
    @api.doc('get_applications_for_mission')
    def get(self, mission_id):
        """Get all applications for a mission"""
        return get_applications_for_mission(mission_id)
