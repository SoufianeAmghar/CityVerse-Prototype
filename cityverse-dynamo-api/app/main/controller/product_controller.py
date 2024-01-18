import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import ProductDto
from ..service.product_service import (
    save_new_product,
    get_all_products,
    get_a_product,
    delete_product,
    update_product,
    create_post,
    edit_post,
    delete_post,
    add_coordinate,
    update_coordinate,
    get_all_posts,
    toggle_reaction
)

api = ProductDto.api
_product = ProductDto.product
_post = ProductDto.post
_coordinate = ProductDto.coordinate

@api.route('/')
class ProductList(Resource):
    @api.doc('list_of_products')
    def get(self):
        """List all products"""
        return get_all_products()

    @api.expect(_product, validate=True)
    @api.response(201, 'Product successfully created.')
    @api.doc('create a new product')
    def post(self):
        """Creates a new Product"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        #data = request.json
        banner_file = request.files.get('banner_image')
        profile_file = request.files.get('profile_image')
        return save_new_product(data,banner_image=banner_file,profile_image=profile_file)


@api.route('/<product_id>')
@api.param('product_id', 'The Product identifier')
@api.response(404, 'Product not found.')
class Product(Resource):
    @api.doc('get a product')
    def get(self, product_id):
        """Get a product given its identifier"""
        product = get_a_product(product_id)
        if not product:
            api.abort(404)
        else:
            return product

    @api.doc('Delete Product')
    def delete(self, product_id):
        """Delete a product given its identifier"""
        return delete_product(product_id)

    @api.response(201, 'Product successfully updated.')
    @api.doc('update product')
    def put(self, product_id):
        """Update a Product"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        banner_file = request.files.get('banner_image')
        profile_file = request.files.get('profile_image')
        return update_product(product_id, data,profile_image=profile_file,banner_image=banner_file)

    @api.expect(_coordinate, validate=True)
    @api.response(201, 'Coordinate successfully added.')
    @api.doc('add a new coordinate for a product')
    def post(self, product_id):
        """Add a new Coordinate for a Product"""
        data = request.json
        return add_coordinate(product_id, data)

    @api.expect(_coordinate, validate=True)
    @api.response(201, 'Coordinate successfully updated.')
    @api.doc('update an existing coordinate for a product')
    def put(self, product_id):
        """Update an existing Coordinate for a Product"""
        data = request.json
        return update_coordinate(product_id, data)
    

@api.route('/post/<product_id>')
@api.param('product_id', 'Product ID of the post')
@api.response(404, 'Product not found.')
class PostList(Resource):
    @api.doc('list_of_posts')
    def get(self):
        """List all products"""
        return get_all_posts()
    
    @api.expect(_post, validate=True)
    @api.response(201, 'Post successfully created.')
    @api.doc('create a new post for a product')
    def post(self, product_id):
        """Create a new Post for a Product"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        img_files = request.files.getlist('img')
        video_files = request.files.getlist('video')
        return create_post(product_id, data,img_files, video_files)
    
@api.route('/post/<post_id>')
@api.param('post_id', 'Post identifier')
@api.response(404, 'Post not found.')
class Post(Resource):
    @api.expect(_post, validate=True)
    @api.response(201, 'Post successfully edited.')
    @api.doc('edit an existing post for a product')
    def put(self, post_id):
        """Edit an existing Post for a Product"""
        data = request.json
        return edit_post(post_id, data)
    
    @api.doc('delete an existing post for a product')
    def delete(self, post_id):
        """Delete an existing Post for a Product"""
        return delete_post(post_id)
    
@api.route('/post/<post_id>/react')
@api.param('post_id', 'Post identifier')
@api.response(404, 'Post not found.')
class Post(Resource):
    @api.expect(_post, validate=True)
    @api.response(201, 'Post reactions updated.')
    @api.doc('increment or decrement reactions count per clicks')
    def put(self, post_id):
        """Increment or decrement reaction count"""
        data = request.json
        return toggle_reaction(post_id, data)
    
