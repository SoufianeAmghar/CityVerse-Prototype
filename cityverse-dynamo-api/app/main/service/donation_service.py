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


def create_donation(data, image_files, video_files):
    document = Document(__TABLE_NAME__='Donation', __BUCKET_NAME__='cityverse-videos',
                        __S3_OBJECT_PREFIX__='media-posts/')

    image_urls = []

    video_urls = []

    if image_files:
        for img_file in image_files:
            img_url = document.upload_image_to_s3(img_file)
            if img_url is not None:
                image_urls.append(img_url)
            else:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload an image to S3.',
                }, 500

    if video_files:
        for vid_file in video_files:
            vid_url = document.upload_video_to_s3(vid_file)
            if vid_url is not None:
                video_urls.append(vid_url)
            else:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload a video to S3.',
                }, 500
    donation_item = {
        'id': generate_id(),
        'creator_id': data['creator_id'],
        'name': data['name'],
        'purpose': data['purpose'],
        'tax_reduction': data.get('tax_reduction', 0),
        'is_reduction_eligible': data.get('is_reduction_eligible', False),
        'modified_on': datetime.utcnow().isoformat(),
        'created_on': datetime.utcnow().isoformat(),
        'link': data['link'],
        'links': image_urls + video_urls if image_urls or video_urls else []
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


def donate(donation_id, data):
    donations_document = Document(__TABLE_NAME__='Donations')
    user_document = Document(__TABLE_NAME__='User')

    donation_item = {
        'id': generate_id(),
        'user_id': data['user_id'],
        'donation_id': donation_id,
        'address': data.get('address',''),
        'age': data.get('age',0),
        'first_name': data.get('first_name',''),
        'surname': data.get('surname',''),
        'amount': data.get('amount',0)
    }

    try:
        user = user_document.get_item(data['user_id'])
        if user:
            if 'badge' not in user or not isinstance(user['badge'], list):
                user['badge'] = []
            badge = "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/Badge+Donation.png"

            if badge not in user['badge']:
                user['modified_on'] = datetime.utcnow().isoformat()
                user['score'] = int(user.get('score', 0)) + 1500
                user['badge'].append(badge)
        donations_document.save(item=donation_item)
        user_document.save(item=user)
        return {
            'status': 'success',
            'message': 'Donation successfully added.',
        }, 201
    except Exception as e:
        logging.error(f"Failed to add donation: {str(e)}")
        return {
            'status': 'fail',
            'message': f'Failed to add donation: {str(e)}'
        }, 500
    
def get_donations_for_donation(donation_id):
    document = Document(__TABLE_NAME__='Donations')
    donations = document.query(
        index='donation_id-index',
        condition='donation_id = :donation_id',
        value={':donation_id': donation_id}
    )
    return donations
