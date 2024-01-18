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

def get_all_badges():
    document = Document(__TABLE_NAME__='Badge')

        # Query all products
    badges = document.get_all()

    return badges

def get_a_badge(badge_id):
    document = Document(__TABLE_NAME__='Badge')

    product = document.get_item(badge_id)

    if product is None:
        logging.warning(f"Product with ID {badge_id} not found.")

    return product

def get_badge_by_name(name):
        document = Document(__TABLE_NAME__='Badge')
        

        badge = document.query(
        index='nom-index',
        condition='nom = :nom',
        value={':nom': name}
    )
        if badge:
            return True
        else:
            return False

def create_badge(data):
    document = Document(__TABLE_NAME__='Badge')

    existing_badge = get_badge_by_name(data['name'])
    if existing_badge:
            return {
                'status': 'fail',
                'message': 'Badge with this name already exists. Please choose a different name.',
            }, 409
    badge_item = {
            'id': generate_id(),
            'created_on': datetime.utcnow().isoformat(),
            'modified_on': datetime.utcnow().isoformat(),
            'coordinate': data.get('coordinate', []),
            'user_id': data['created_by'],
            'modified_by': data['modified_by'],
            'nom': data['name']
        }

        
    document.save(item=badge_item)

    return {
            'status': 'success',
            'message': 'Badge successfully created.',
        }, 201

def delete_badge(badge_id):
     document = Document(__TABLE_NAME__='Badge')

     badge = get_a_badge(badge_id)

     if badge:
            document.delete_item(Key={'id': badge_id})
            return {
                'status': 'success',
                'message': 'Badge successfully deleted.',
            }, 200
     else:
            return {
                'status': 'fail',
                'message': 'Badge not found.',
            }, 404
def edit_badge(badge_id,data):
     document = Document(__TABLE_NAME__='Badge')

     badge = get_a_badge(badge_id)

     if badge:
            badge.update({
                'created_on': data.get('created_on', badge.get('created_on')),
                'modified_on': datetime.utcnow().isoformat(),
                'coordinate': data.get('coordinate', badge.get('coordinate')),
                'created_by': data.get('created_by', badge.get('created_by')),
                'modified_by': data.get('modified_by', badge.get('modified_by')),
                'name': data.get('name', badge.get('name'))
            })

            # Save the updated product item
            document.save(item=badge)

            return {
                'status': 'success',
                'message': 'Product successfully updated.',
            }, 201
     else:
          
          return {
                'status': 'fail',
                'message': 'Badge not found.',
            }, 401
     