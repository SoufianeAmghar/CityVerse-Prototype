from app.db.dynamodb_document import Document
from ..service.user_service import get_a_user
from datetime import datetime
import logging
from app.main.util.strings import generate_id

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def get_all_events():
    document = Document(__TABLE_NAME__='Event')

        # Query all products
    events = document.get_all()

    return events

def get_an_event(event_id):
    document = Document(__TABLE_NAME__='Event')

    product = document.get_item(event_id)

    if product is None:
        logging.warning(f"Product with ID {event_id} not found.")

    return product

def get_event_by_name(name):
        document = Document(__TABLE_NAME__='Event')
        

        event = document.query(
        index='nom-index',
        condition='nom = :nom',
        value={':nom': name}
    )
        if event:
            return True
        else:
            return False

def create_event(data):
    document = Document(__TABLE_NAME__='Event')

    existing_event = get_event_by_name(data['name'])
    if existing_event:
            return {
                'status': 'fail',
                'message': 'Event with this name already exists. Please choose a different name.',
            }, 409
    event_item = {
            'id': generate_id(),
            'created_on': datetime.utcnow().isoformat(),
            'modified_on': datetime.utcnow().isoformat(),
            'coordinate': data.get('coordinate', []),
            'user_id': data['created_by'],
            'modified_by': data['modified_by'],
            'nom': data['name'],
            'sgd': data['sgd']
        }

        
    document.save(item=event_item)

    return {
            'status': 'success',
            'message': 'Event successfully created.',
        }, 201

def delete_event(event_id):
     document = Document(__TABLE_NAME__='Event')

     event = get_a_event(event_id)

     if event:
            document.delete_item(Key={'id': event_id})
            return {
                'status': 'success',
                'message': 'Event successfully deleted.',
            }, 200
     else:
            return {
                'status': 'fail',
                'message': 'Event not found.',
            }, 404
def edit_event(event_id,data):
     document = Document(__TABLE_NAME__='Event')

     event = get_a_event(event_id)

     if event:
            event.update({
                'created_on': data.get('created_on', event.get('created_on')),
                'modified_on': datetime.utcnow().isoformat(),
                'coordinate': data.get('coordinate', event.get('coordinate')),
                'created_by': data.get('created_by', event.get('created_by')),
                'modified_by': data.get('modified_by', event.get('modified_by')),
                'name': data.get('name', event.get('name')),
                'sgd': data.get('sgd', event.get('sgd'))
            })

            # Save the updated product item
            document.save(item=event)

            return {
                'status': 'success',
                'message': 'Product successfully updated.',
            }, 201
     else:
          
          return {
                'status': 'fail',
                'message': 'Event not found.',
            }, 401
     
def get_filtered_events(data):
     document = Document(__TABLE_NAME__='Event')

     sgd = data.get('sgd')
        

     events = document.query(
        index='nom-index',
        condition='sgd = :sgd',
        value={':sgd': sgd}
    )
     if events:
            return events
     else:
            return {
                'status': 'fail',
                'message': 'No events found matching the selected SGD.',
            }, 401
     
     
          
     

