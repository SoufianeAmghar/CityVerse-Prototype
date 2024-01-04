from app.db.dynamodb_document import Document
from ..service.user_service import get_a_user,join_product
from datetime import datetime
import logging
from app.main.util.strings import generate_id

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def save_new_product(data, banner_image, profile_image):
        document = Document(__TABLE_NAME__='Product', __BUCKET_NAME__='cityverse-profilepics',
                            __S3_OBJECT_PREFIX__='product-images/')

        # Check if the product already exists by name
        existing_product = get_product_by_name(data['name'])
        if existing_product:
            return {
                'status': 'fail',
                'message': 'Product with this name already exists. Please choose a different name.',
            }, 409

        banner_image_url = None
        # Upload product banner image to S3
        if banner_image:
            banner_image_url = document.upload_profile_image_to_s3(
                banner_image)
            if banner_image_url is None:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload profile image to S3.',
                }, 500

        profile_image_url = None

        if profile_image:
            profile_image_url = document.upload_profile_image_to_s3(
                profile_image)
            if profile_image_url is None:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload profile image to S3.',
                }, 500

        # Create a new product item
        product_item = {
            'id': generate_id(),
            'created_on': datetime.utcnow().isoformat(),
            'modified_on': datetime.utcnow().isoformat(),
            'banner_image': banner_image_url,
            'profile_image': profile_image_url,
            'coordinate': data.get('coordinate', []),
            'created_by': data['created_by'],
            'modified_by': data['modified_by'],
            'nom': data['name'],
            'posts': data.get('posts', []),
            'profile_image': profile_image_url,
            'type': data['type']
        }

        # Save the product item to the DynamoDB table
        document.save(item=product_item)
        user = get_a_user(data['created_by'])
      
        if user:
            resp = join_product(data['created_by'], product_item['id'])
            message = 'Product successfully created.' + resp[0]['message']
        else:
            message = 'Product successfully created. User not found.'

        return {
            'status': 'success',
            'message': message,
        }, 201

def get_all_products():
        document = Document(__TABLE_NAME__='Product')

        # Query all products
        products = document.get_all()

        return products

def get_a_product(product_id):
        document = Document(__TABLE_NAME__='Product')

        product = document.get_item(product_id)

        if product is None:
            logging.warning(f"Product with ID {product_id} not found.")

        return product

def update_product(product_id, data):
        document = Document(__TABLE_NAME__='Product', __BUCKET_NAME__='your-s3-bucket-name',
                            __S3_OBJECT_PREFIX__='product-images/')
        banner_image_url = None

        if data.get('banner_image'):
            banner_image_url = document.upload_profile_image_to_s3(
                data['banner_image'])
            if banner_image_url is None:
                return {
                    'status': 'fail',
                    'message': 'Failed to upload banner image to S3.',
                }, 500

        product = get_a_product(product_id)

        if product:
            product.update({
                'created_on': data.get('created_on', product.get('created_on')),
                'modified_on': datetime.utcnow().isoformat(),
                'banner_image': banner_image_url or product.get('banner_image'),
                'coordinate': data.get('coordinate', product.get('coordinate')),
                'created_by': data.get('created_by', product.get('created_by')),
                'modified_by': data.get('modified_by', product.get('modified_by')),
                'name': data.get('name', product.get('name')),
                'posts': data.get('posts', product.get('posts')),
                'profile_image': data.get('profile_image', product.get('profile_image')),
                'type': data.get('type', product.get('type')),
            })

            # Save the updated product item
            document.save(item=product)

            return {
                'status': 'success',
                'message': 'Product successfully updated.',
            }, 201

def delete_product(self, product_id):
        document = Document(__TABLE_NAME__='Product')

        # Delete a product by its unique identifier
        product = self.get_product_by_id(product_id)
        if product:
            document.delete_item(Key={'id': product_id})
            return True
        else:
            return False

def get_product_by_name(name):
        document = Document(__TABLE_NAME__='Product')
        

    # Retrieve a product by its name
        product = document.query(
        index='nom-index',
        condition='nom = :nom',
        value={':nom': name}
    )
        if product:
            return True
        else:
            return False

def create_post(self, product_id, post_data):
        document = Document(__TABLE_NAME__='Product')

        product = self.get_product_by_id(product_id)

        if product:
            post_id = generate_id()
            post_data['id'] = post_id
            post_data['created_on'] = datetime.utcnow().isoformat()
            post_data['modified_on'] = datetime.utcnow().isoformat()

            product['posts'].append(post_data)

            # Save the updated product with the new post
            document.save(item=product)

            return {
                'status': 'success',
                'message': 'Post successfully created.',
                'post_id': post_id
            }, 201
        else:
            return {
                'status': 'fail',
                'message': 'Product not found.',
            }, 404

def edit_post(self, product_id, post_id, post_data):
        document = Document(__TABLE_NAME__='Product')

        product = self.get_product_by_id(product_id)

        if product:
            for post in product['posts']:
                if post['id'] == post_id:
                    post.update(post_data)
                    post['modified_on'] = datetime.utcnow().isoformat()

                    # Save the updated product with the updated post
                    document.save(item=product)

                    return {
                        'status': 'success',
                        'message': 'Post successfully updated.',
                    }, 201

            return {
                'status': 'fail',
                'message': 'Post not found.',
            }, 404
        else:
            return {
                'status': 'fail',
                'message': 'Product not found.',
            }, 404

def delete_post(self, product_id, post_id):
        document = Document(__TABLE_NAME__='Product')

        product = self.get_product_by_id(product_id)

        if product:
            product['posts'] = [
                post for post in product['posts'] if post['id'] != post_id]

            # Save the updated product without the deleted post
            document.save(item=product)

            return {
                'status': 'success',
                'message': 'Post successfully deleted.',
            }, 200
        else:
            return {
                'status': 'fail',
                'message': 'Product not found.',
            }, 404

def add_coordinate(self, product_id, coordinate_data):
        document = Document(__TABLE_NAME__='Product')

        product = self.get_product_by_id(product_id)

        if product:
            coordinate_id = generate_id()
            coordinate_data['id'] = coordinate_id

            product['coordinate'].append(coordinate_data)

            # Save the updated product with the new coordinate
            document.save(item=product)

            return {
                'status': 'success',
                'message': 'Coordinate successfully added.',
                'coordinate_id': coordinate_id
            }, 201
        else:
            return {
                'status': 'fail',
                'message': 'Product not found.',
            }, 404

def update_coordinate(self, product_id, coordinate_id, coordinate_data):
        document = Document(__TABLE_NAME__='Product')

        product = self.get_product_by_id(product_id)

        if product:
            for coordinate in product['coordinate']:
                if coordinate['id'] == coordinate_id:
                    coordinate.update(coordinate_data)

                    # Save the updated product with the updated coordinate
                    document.save(item=product)

                    return {
                        'status': 'success',
                        'message': 'Coordinate successfully updated.',
                    }, 201

            return {
                'status': 'fail',
                'message': 'Coordinate not found.',
            }, 404
        else:
            return {
                'status': 'fail',
                'message': 'Product not found.',
            }, 404