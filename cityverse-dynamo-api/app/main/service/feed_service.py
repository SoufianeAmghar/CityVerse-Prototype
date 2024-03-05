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

    user = get_a_user(data)
    if user:

        followed_creator_ids = set(user.get('followings', []))

        posts_from_followed = [
            post for post in posts if post['creator_id'] in followed_creator_ids]

        return posts_from_followed
    else:
        return {
            'status': 'fail',
            'message': 'User doesnt exist',
        }, 500


def get_filtered_posts(data):
    return 0


def post_comment_on_post(post_id, data):
    document = Document(__TABLE_NAME__='Posts')
    post = document.get_item(post_id)

    if post:
        # Extract comment data from the request
        comment_text = data.get('text')
        # Assuming user name is provided in the data
        user_name = data.get('user_name')
        current_time = datetime.utcnow().isoformat()

        new_comment = {
            'id': generate_id(),
            'text': comment_text,
            'user_name': user_name,
            'post_date': current_time,
            'edit_date': None
        }

        # Get the existing comments or an empty list
        comments = post.get('comments', [])
        comments.append(new_comment)  # Add the new comment to the list

        # Update the post with the new comments array
        post['comments'] = comments

        # Save the updated post back to the database
        document.save(item=post)

        return {
            'status': 'success',
            'message': 'Comment successfully posted on the post.',
        }, 201
    else:
        return {
            'status': 'fail',
            'message': 'Post not found.',
        }, 404


def edit_comment(post, comment_id, new_text):
    # Get the comments array from the post
    comments = post.get('comments', [])

    # Find the comment with the specified comment_id
    for comment in comments:
        if comment.get('id') == comment_id:
            # Update the text content of the comment
            comment['text'] = new_text
            # Update the edit date of the comment
            comment['edit_date'] = datetime.utcnow().isoformat()

            return True  # Indicate success

    return False


def edit_comment_on_post(post_id, data):
    document = Document(__TABLE_NAME__='Posts')
    post = document.get_item(post_id)

    if post:
        if edit_comment(post, data.get('comment_id'), data.get('text')):
            # Save the updated post back to the database
            document.save(item=post)

            return {
                'status': 'success',
                'message': 'Comment successfully edited.',
            }, 200
        else:
            return {
                'status': 'fail',
                'message': 'Comment not found.',
            }, 404
    else:
        return {
            'status': 'fail',
            'message': 'Post not found.',
        }, 404


def get_reactions_post(post_id):
    document = Document(__TABLE_NAME__='Posts')
    post = document.get_item(post_id)

    if post:
        return post['reactions']
    else:
        return {
            'status': 'fail',
            'message': 'Post not found.',
        }, 404


def edit_reaction_on_post(post_id, data):
    document = Document(__TABLE_NAME__='Posts')
    post = document.get_item(post_id)

    if post:
        reactions = post.get('reactions', [])

        new_reaction = {
            'type': data.get('type'),
            # Assuming current timestamp if date not provided
            'date': data.get('date', datetime.now().isoformat()),
            'reacted_by': [data.get('reacted_by')]
        }

        existing_index = next((index for index, reaction in enumerate(
            reactions) if reaction['type'] == new_reaction['type']), None)

        if existing_index is not None:
            # Check if the user has already reacted for this type of reaction
            if data['reacted_by'] not in reactions[existing_index]['reacted_by']:
                reactions[existing_index]['reacted_by'].append(
                    data['reacted_by'])
                reactions[existing_index]['date'] = new_reaction['date']
            else:
                return {
                    'status': 'Not modified',
                    'message': 'User already reacted with the same type of reaction.',
                }, 200

        else:
            reactions.append(new_reaction)

        post['reactions'] = reactions

        document.save(item=post)

        return {
            'status': 'success',
            'message': 'Reaction successfully added.'
        }, 200
            'status': 'success',
            'message': 'Reaction successfully added.'
        }, 200
    else:
        return {
            'status': 'fail',
            'message': 'Post not found.',
        }, 404
