import boto3

dynamodb = boto3.resource('dynamodb')
UserProfile = dynamodb.Table('UserProfiles')
User = dynamodb.Table('User')