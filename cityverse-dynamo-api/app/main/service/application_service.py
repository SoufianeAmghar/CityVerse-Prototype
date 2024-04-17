from app.db.dynamodb_document import Document
from app.main.util.strings import generate_id
import logging
from datetime import datetime


def apply_for_mission(mission_id,data):
    document = Document(__TABLE_NAME__='Application')

    has_a_car = data.get('has_a_car', False)
    permit = data.get('permit', False)
    interests = data.get('interests', '')

    application_item = {
        'id': generate_id(),
        'user_id': data['user_id'],
        'mission_id': mission_id,
        'has_a_car': has_a_car,
        'permit': permit,
        'address': data['address'],
        'age': data['age'],
        'first_name': data['first_name'],
        'surname': data['surname'],
        'interests': interests,
        'status': 'Pending'
    }

    try:
        document.save(item=application_item)
        return {
            'status': 'success',
            'message': 'Application successfully created.',
        }, 201
    except Exception as e:
        logging.error(f"Failed to create application: {str(e)}")
        return {
            'status': 'fail',
            'message': f'Failed to create application: {str(e)}'
        }, 500


def get_applications_for_mission(mission_id):
    document = Document(__TABLE_NAME__='Application')
    applications = document.query(
        index='mission_id_index',
        condition='mission_id = :mission_id',
        value={':mission_id': mission_id}
    )
    return applications

def approve_application(application_id,data):
    mission_id = data.get('mission_id')

    application_document = Document(__TABLE_NAME__='Application')
    user_document = Document(__TABLE_NAME__='User')
    application = application_document.get_item(application_id)
    if application:
      user = user_document.get_item(application['user_id'])
    else:
        return {
            'status': 'fail',
            'message': 'Application for approval not found.',
        }, 404
    if user:
        if 'badge' not in user or not isinstance(user['badge'], list):
            user['badge'] = []
    else:
        return {
            'status': 'fail',
            'message': 'User not found.',
        }, 404
    if application:
        if application['status'] == 'Approved':
            return {
                'status': 'fail',
                'message': 'Application is already approved.',
            }, 400
        application['status'] = 'Approved'

        badge = "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/Virtual+Badge+Mission.png"

        if badge not in user['badge']:
          user['modified_on'] = datetime.utcnow().isoformat()
          user['score'] = int(user.get('score', 0)) + 900
          user['badge'].append(badge)

        user_document.save(item=user)
        application_document.save(item=application)
    else:
        return {
            'status': 'fail',
            'message': 'Application not found.',
        }, 404

    # Increment the number of participants in the mission
    mission_document = Document(__TABLE_NAME__='Mission')
    mission = mission_document.get_item(mission_id)
    if mission:
        mission['approved_applications'] = int(mission['approved_applications']) + 1
        mission_document.save(item=mission)
    else:
        return {
            'status': 'fail',
            'message': 'Mission not found.',
        }, 404

    return {
        'status': 'success',
        'message': 'Application approved successfully.',
    }, 200

