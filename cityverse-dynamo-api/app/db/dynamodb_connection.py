import boto3

dynamodb = boto3.resource('dynamodb')
Blacklist = dynamodb.Table('Blacklist')
User = dynamodb.Table('User')