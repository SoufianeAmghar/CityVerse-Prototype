import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import FeedDto
from ..service.feed_service import (
    get_all_posts,
    get_filtered_posts,
    post_comment_on_post,
    edit_comment_on_post,
    get_reactions_post
)


api = FeedDto.api

@api.route('/')
class Feed(Resource):
    @api.doc('list_of_posts')
    def get(self):
        """List all posts from associations user follows"""
        data = request.headers.get('UserAgent')
        return get_all_posts(data)

@api.route('/<post_id>')
@api.param('post_id', 'The Post identifier')
class FeedPost(Resource):
    @api.doc('post_comment')
    def post(self,post_id):
        """Post a comment on a post"""
        data = request.json
        return post_comment_on_post(post_id, data)
    
    @api.doc('edit comment')
    def put (self,post_id):
        "Edit a comment on a post"
        data = request.json
        return edit_comment_on_post(post_id, data)
    
    @api.doc('get emojis')
    def get(self,post_id):
        return get_reactions_post(post_id)





@api.route('/search')
class PostList(Resource):
    @api.doc('list_of_posts')
    def get(self):
        """List posts by filter"""
        data = request.json
        return get_filtered_posts(data)
