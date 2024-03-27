from app.db.dynamodb_document import Document
from datetime import datetime
import logging
from app.main.util.strings import generate_id
from decimal import Decimal

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def get_all_donations():
    document = Document(__TABLE_NAME__='Donation')

    # Query all donations
    donations = document.get_all()
    if donations:

        return donations
    else:
        return {
            'status': 'fail',
            'message': 'Donation campaigns dont exist',
        }, 500
    
def get_donation(donation_id):
    document = Document(__TABLE_NAME__='Donation')
    donation = document.get_item(donation_id)
    if donation is None:
        logging.warning(f"Donation with ID {donation_id} not found.")
    return donation


def create_donation(data):
    document = Document(__TABLE_NAME__='Donation')
    donation_item = {
        'id': generate_id(),
        'creator_id': data['creator_id'],
        'name': data['name'],
        'purpose': data['purpose'],
        'tax_reduction': data.get('tax_reduction',0),
        'is_reduction_eligible': data.get('is_reduction_eligible', False),
        'modified_on': datetime.utcnow().isoformat(),
        'created_on': datetime.utcnow().isoformat(),
        'link': data['link']


    }

    # Save the user item to the DynamoDB table
    document.save(item=donation_item)

    return {
        'status': 'success',
        'message': 'Donation campaign successfully created.',
    }, 201


def edit_donation(donation_id, data):
    document = Document(__TABLE_NAME__='Donation')

    donation = get_donation(donation_id)

    if donation:
        donation.update({
            'link': data.get('link', donation.get('link')),
            'name': data.get('name', donation.get('name')),
            'purpose': data.get('purpose', donation.get('purpose')),
            'tax_reduction': data.get('tax_reduction', donation.get('tax_reduction')),
            'is_reduction_eligible': data.get('is_reduction_eligible', donation.get('is_reduction_eligible'))
        })

        document.save(item=donation)

        return {
            'status': 'success',
            'message': 'Donation campaign successfully updated.',
        }, 201
    else:
        return {
            'status': 'fail',
            'message': 'Donation campaign not found.',
        }, 404
