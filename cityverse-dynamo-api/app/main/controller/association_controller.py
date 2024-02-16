import json
from flask import request
from flask_restplus import Resource

from app.main.util.decorator import token_required
from ..util.dto import AssociationDto, ProductDto
from ..service.association_service import (
    create_association,
    edit_association,
    delete_association,
    get_a_association,
    get_all_associations,
    get_associations_by_sdg,
    check_siege_exists,
    verify_rna_number,
    create_post
)

api = AssociationDto.api
_association = AssociationDto.association
_post = ProductDto.post


@api.route('/')
class PlaceList(Resource):
    @api.doc('list_of_associations')
    def get(self):
        """List all associations"""
        return get_all_associations()  

    @api.expect(_association, validate=True)
    @api.response(201, 'Association successfully created.')
    @api.doc('create a new association')
    def post(self):
        """Creates a new Place""" 
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        banner_file = request.files.get('banner_image')
        profile_file = request.files.get('profile_image')
        return create_association(data,banner_image=banner_file,profile_image=profile_file)


@api.route('/<association_id>')
@api.param('association_id', 'The Place identifier')
@api.response(404, 'Place not found.')
class Place(Resource):
    @api.doc('get a association')
    def get(self, association_id):
        """Get a association given its identifier"""
        data = request.json
        association = get_a_association(association_id,data) 
        if not association:
            api.abort(404)
        else:
            return association

    @api.doc('Delete Association')
    def delete(self, association_id):
        """Delete a association given its identifier"""
        data = request.json
        
        return delete_association(association_id,data)  

    @api.response(201, 'Place successfully updated.')
    @api.doc('update association')
    def put(self, association_id):
        """Update a Place"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        return edit_association(association_id, data)
    

@api.route('/search')
class PlaceList(Resource):
    @api.doc('list_of_associations')
    def post(self):
        """List associations by SGD"""
        data = request.json
        return get_associations_by_sdg(data)  
    
@api.route('/verify-siege')
class PlaceVerifySiege(Resource):
    @api.doc('verify_siege')
    def post(self):
        """Verify siege"""
        data = request.json
        return check_siege_exists(data)
    
@api.route('/verify-rna')
class PlaceVerifySiege(Resource):
    @api.doc('verify_rna')
    def post(self):
        """Verify siege"""
        data = request.json
        return verify_rna_number(data)
    
@api.route('/post')
class Post(Resource):
    @api.expect(_post, validate=True)
    @api.response(201, 'Post successfully created.')
    @api.doc('create a new post for a product')
    def post(self):
        """Create a new Post for a Product"""
        json_data_str = request.form.get('json')
        data = json.loads(json_data_str) if json_data_str else {}
        img_files = request.files.getlist('img')
        video_files = request.files.getlist('video')
        return create_post( data,img_files, video_files)

