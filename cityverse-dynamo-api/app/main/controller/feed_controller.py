import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import FeedDto
from ..service.feed_service import (
    get_all_posts,
    get_filtered_posts
)


api = FeedDto.api

@api.route('/')
class Feed(Resource):
    @api.doc('list_of_posts')
    def get(self):
        """List all posts from associations user follows"""
        data = request.json
        return get_all_posts(data)



@api.route('/search')
class PostList(Resource):
    @api.doc('list_of_posts')
    def get(self):
        """List posts by filter"""
        data = request.json
        return get_filtered_posts(data)
