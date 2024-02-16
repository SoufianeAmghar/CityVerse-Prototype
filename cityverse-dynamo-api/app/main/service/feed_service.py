from app.db.dynamodb_document import Document
from ..service.user_service import get_a_user
from datetime import datetime
import logging
from app.main.util.strings import generate_id
from decimal import Decimal

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def get_all_posts(data):
    document = Document(__TABLE_NAME__='Posts')

        # Query all posts
    posts = document.get_all()

    user = get_a_user(data.get('user_id',''))
    logging.info(user)
    if user:

      followed_creator_ids = set(user.get('followings',[]))

      posts_from_followed = [post for post in posts if post['creator_id'] in followed_creator_ids]

      return posts_from_followed
    else:
        return {
                'status': 'fail',
                'message': 'User doesnt exist',
            }, 500

def get_filtered_posts(data):
    return 0

