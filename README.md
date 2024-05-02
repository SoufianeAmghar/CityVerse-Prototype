# CityVerse-Prototype
Cityverse is a virtual overlay for the physical Paris city. Powered by local news, Cityverse connects the community through information, ideas and experiences through an interactive social network and a 3D map.

# Deployment Cloud Architecture 

![Diagramme vierge](https://github.com/SoufianeAmghar/CityVerse-Prototype/assets/94147142/c4930edb-61e2-4337-9294-3b2cc3cd2809)

For local setups, don't forget the following command to install back-end dependencies:

`pip install -r requirements.txt`

## DynamoDB Database Setup

The following sections outline the key aspects of the DynamoDB database setup for the CityVerse-Prototype project as seen in the image below :

![Capture d’écran du 2024-05-02 17-18-31](https://github.com/SoufianeAmghar/CityVerse-Prototype/assets/94147142/335f528e-792f-4876-a1d7-3a8ca47909d4)


### 1. Table Design

All identifiers datatype are in String and must be respected, table names must be respected as well.

The image below shows how to create a table :

![setup tables](https://github.com/SoufianeAmghar/CityVerse-Prototype/assets/94147142/c54ebe7e-2fd4-4f79-b9f2-e86720ec70e1)


#### Blacklist :
- **Primary Key**: `token` (unique identifier for each blacklisted token)


#### Other tables shown in the image :
- **Primary Key**: `id` (unique identifier for each table)

### 2. Secondary Indexes

- **Global Secondary Index**: (for sorting results and other specific queries that combines multiple tables for all regions)
    - **Application**:
         `mission_id_index` with partition key `mission_id`, `user_id-index` with partition key `user_id`
    - **Donations**:
        `donation_id-index` with partition key `donation_id`, `user_id-index` with partition key `user_id`
    - **Posts**:
        `product_id` with partition key `product_id`
    - **Product**:
        `nom-index` with partition key `nom`
    - **User**:
        `email-index` with partition key `email`
      

### 3. Data Modeling

- **Normalization**: Keep data normalized to avoid redundancy and improve query performance.
- **Denormalization**: Consider denormalizing data in specific tables to improve performance and reduce query complexity.

### 4. Data Partitioning

- Optimize partitioning strategies for even data distribution and to avoid hot keys.
- Use composite keys and well-designed hash keys for efficient reads and writes.

### 5. Data Access Patterns

- Identify common data access patterns and map them out.
- Create secondary indexes to support efficient access for common patterns.

### 6. Capacity Management

- Enable auto-scaling for table and index throughput.
- Monitor and adjust read/write capacity based on usage patterns.

### 7. Data Consistency

- Use DynamoDB's eventual consistency for optimal performance.
- Implement conditional writes and transactions for consistent data updates.

### 8. Data Backup and Recovery

- Enable continuous backups and point-in-time recovery for data protection.
- Use DynamoDB Streams for real-time data replication or integration with other services.

### 9. Security

- Utilize AWS Identity and Access Management (IAM) for access control.
- Encrypt data at rest and in transit to ensure security.

### 10. Monitoring and Logging

- Use Amazon CloudWatch to monitor performance and usage metrics.
- Implement logging to track data access and usage patterns.

## Conclusion

The DynamoDB database setup outlined above provides a robust, scalable, and efficient data layer for the CityVerse-Prototype project. By following the best practices in this documentation, you can ensure a smooth user experience and efficient data management.

## AWS S3 Setup

The following sections outline the key aspects of the AWS S3 setup for the CityVerse-Prototype project as seen in the image below
![Capture d’écran du 2024-05-02 17-38-51](https://github.com/SoufianeAmghar/CityVerse-Prototype/assets/94147142/1ea9db0a-ab39-4c8f-9e8d-e4e7fc5382b7)



### 1. Bucket Configuration

- **Bucket Names**: `cityverse-profilepics` and `cityverse-videos` must be respected
- **Region**: Select an appropriate AWS region based on your application's user base and latency requirements.
- **Versioning**: Enabled.

### 2. Data Organization

- **Folder Structure**: Use logical folders (prefixes) to organize your data efficiently (e.g., `media-posts/` used for cityverse-videos bucket).
- **Lifecycle Policies**: Define lifecycle policies to manage data storage and retention efficiently, such as transitioning objects to Glacier storage class.

### 3. Security and Access Control

Don't block public access.

- **Bucket Policies**: Implement bucket policies to control access at the bucket level, ensuring only authorized access.
for cityverse-profilepics:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cityverse-videos/*"
        }
    ]
}

for cityverse-videos:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cityverse-videos/*"
        }
    ]
}

### 4. Data Encryption

- **Server-Side Encryption**: Enable server-side encryption (SSE) for data at rest using AWS-KMS or AES-256.

### 5. Data Access and Transfer

- **Pre-Signed URLs**: Use pre-signed URLs to grant temporary access to S3 objects securely.
- **Multipart Uploads**: Use multipart uploads for large files to improve upload performance and resilience.

### 6. Performance Optimization

- **Content Delivery Network (CDN)**: Use Amazon CloudFront as a CDN to deliver content efficiently and globally.
- **S3 Transfer Acceleration**: Enable S3 Transfer Acceleration for faster data uploads and downloads.

### 7. Logging and Monitoring

- **Server Access Logging**: Enable server access logging to track requests and access patterns for S3 buckets.
- **CloudWatch Metrics and Alarms**: Use Amazon CloudWatch for monitoring performance and setting up alarms for threshold breaches.

### 8. Backup and Disaster Recovery

- **Data Backup**: Implement a backup strategy using S3 replication or third-party backup services.
- **Data Recovery**: Utilize S3 object versioning for recovery in case of accidental deletion or modification.

### 9. Costs and Billing

- **Cost Management**: Monitor S3 usage and costs using AWS Cost Explorer and set up budgets and alerts.
- **Storage Classes**: Optimize costs by using appropriate storage classes for different types of data (e.g., Standard, Intelligent-Tiering, Glacier).

## Conclusion

The AWS S3 setup outlined above provides a robust and scalable storage solution for your CityVerse-Prototype project. By following the best practices detailed in this documentation, you can optimize storage management and ensure data security, performance, and cost efficiency.


## Access keys and control setup :

To use all AWS services or other ones for the application, always update these specific lines in .env and config file :

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=

in the IAM Management console, create the user and user group for the permissions you need as shown in the picture below :
![Capture d’écran du 2024-05-02 17-49-18](https://github.com/SoufianeAmghar/CityVerse-Prototype/assets/94147142/60a9e6cc-1b4e-4068-8820-82fefa81998e)

At the security credentials tab inside User create access keys as in the picture below:


![Capture d’écran du 2024-05-02 17-54-05](https://github.com/SoufianeAmghar/CityVerse-Prototype/assets/94147142/bf0b9695-e749-485a-b96f-bd021c641c32)

And simply enter "Other" for use cases and replace the variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACESS_KEY with the downloaded keys and AWS_DEFAULT_REGION with the region you use.

