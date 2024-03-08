from app.db.dynamodb_document import Document
from app.main.util.strings import generate_id
from ..service.application_service import get_applications_for_mission
from datetime import datetime
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def get_all_missions():
    document = Document(__TABLE_NAME__='Mission')
    missions = document.get_all()
    return missions


def get_mission(mission_id):
    document = Document(__TABLE_NAME__='Mission')
    mission = document.get_item(mission_id)
    if mission is None:
        logging.warning(f"Mission with ID {mission_id} not found.")
    return mission


def create_mission(data):
    document = Document(__TABLE_NAME__='Mission')

    mission_item = {
        'id': generate_id(),
        'duration': data['duration'],
        'start_date': data['start_date'],
        'description': data['description'],
        'volunteer_qualifications': data['volunteer_qualifications'],
        'number_of_participants': data['number_of_participants'],
        'approved_applications': 0,
        'mission_type': data['mission_type'],
        'created_on': data['created_on'],
        'status': 'Open Application'  # Initially set status to Open Application
    }

    try:
        document.save(item=mission_item)
        return {
            'status': 'success',
            'message': 'Mission successfully created.',
        }, 201
    except Exception as e:
        logging.error(f"Failed to create mission: {str(e)}")
        return {
            'status': 'fail',
            'message': f'Failed to create mission: {str(e)}'
        }, 500


def delete_mission(mission_id):
    mission_document = Document(__TABLE_NAME__='Mission')
    application_document = Document(__TABLE_NAME__='Application')

    try:
        mission = get_mission(mission_id)

        if mission:
            # Retrieve all applications associated with the mission
            applications = get_applications_for_mission(mission_id)

            # Delete the mission
            mission_document.delete(mission_id)

            # Delete related applications
            for application in applications:
                application_document.delete(application['id'])

            return {
                'status': 'success',
                'message': 'Mission and its related applications successfully deleted.',
            }, 200
        else:
            return {
                'status': 'fail',
                'message': 'Mission not found.',
            }, 404

    except Exception as e:
        logging.error(f"Failed to delete mission: {str(e)}")
        return {
            'status': 'fail',
            'message': f'Failed to delete mission: {str(e)}'
        }, 500


def edit_mission(mission_id, data):
    document = Document(__TABLE_NAME__='Mission')

    mission = get_mission(mission_id)

    if mission:
        mission.update({
            'duration': data.get('duration', mission.get('duration')),
            'start_date': data.get('start_date', mission.get('start_date')),
            'description': data.get('description', mission.get('description')),
            'type': data.get('type', mission.get('type')),
            'volunteer_qualifications': data.get('volunteer_qualifications', mission.get('volunteer_qualifications')),
            'number_of_participants': data.get('number_of_participants', mission.get('number_of_participants'))
        })

        document.save(item=mission)

        return {
            'status': 'success',
            'message': 'Mission successfully updated.',
        }, 201
    else:
        return {
            'status': 'fail',
            'message': 'Mission not found.',
        }, 404