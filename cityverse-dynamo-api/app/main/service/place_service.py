from app.db.dynamodb_document import Document
from ..service.user_service import get_a_user
from boto3.dynamodb.conditions import Key
from datetime import datetime
import logging
from app.main.util.strings import generate_id

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def get_all_places():
    document = Document(__TABLE_NAME__='Place')

        # Query all products
    places = document.get_all()

    return places

def get_a_place(place_id):
    document = Document(__TABLE_NAME__='Place')

    product = document.get_item(place_id)

    if product is None:
        logging.warning(f"Product with ID {place_id} not found.")

    return product

def get_place_by_name(name):
        document = Document(__TABLE_NAME__='Place')
        

        place = document.query(
        index='nom-index',
        condition='nom = :nom',
        value={':nom': name}
    )
        if place:
            return True
        else:
            return False

def create_place(data):
    document = Document(__TABLE_NAME__='Place')

    existing_place = get_place_by_name(data['name'])
    if existing_place:
            return {
                'status': 'fail',
                'message': 'Place with this name already exists. Please choose a different name.',
            }, 409
    place_item = {
            'id': generate_id(),
            'created_on': datetime.utcnow().isoformat(),
            'modified_on': datetime.utcnow().isoformat(),
            'coordinate': data.get('coordinate', []),
            'user_id': data['created_by'],
            'modified_by': data['modified_by'],
            'nom': data['name'],
            'sgd': data['sgd']
        }

        
    document.save(item=place_item)

    return {
            'status': 'success',
            'message': 'Place successfully created.',
        }, 201

def delete_place(place_id):
     document = Document(__TABLE_NAME__='Place')

     place = get_a_place(place_id)

     if place:
            document.delete_item(Key={'id': place_id})
            return {
                'status': 'success',
                'message': 'Place successfully deleted.',
            }, 200
     else:
            return {
                'status': 'fail',
                'message': 'Place not found.',
            }, 404
def edit_place(place_id,data):
     document = Document(__TABLE_NAME__='Place')

     place = get_a_place(place_id)

     if place:
            place.update({
                'created_on': data.get('created_on', place.get('created_on')),
                'modified_on': datetime.utcnow().isoformat(),
                'coordinate': data.get('coordinate', place.get('coordinate')),
                'created_by': data.get('created_by', place.get('created_by')),
                'modified_by': data.get('modified_by', place.get('modified_by')),
                'name': data.get('name', place.get('name')),
                'sgd': data.get('sgd', place.get('sgd'))
            })

            # Save the updated product item
            document.save(item=place)

            return {
                'status': 'success',
                'message': 'Product successfully updated.',
            }, 201
     else:
          
          return {
                'status': 'fail',
                'message': 'Place not found.',
            }, 401
     
def get_filtered_places(data):
     document = Document(__TABLE_NAME__='Place')

     sgd = data.get('sgd')
        

     places = document.query(
        index='nom-index',
        condition=Key('sgd').eq(sgd),
        value={':sgd': sgd}
    )
     if places:
            return places
     else:
            return {
                'status': 'fail',
                'message': 'No places found matching the selected SGD.',
            }, 401
     
     
          
     

