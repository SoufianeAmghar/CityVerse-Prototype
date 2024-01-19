from flask import request, jsonify
from flask_restplus import Resource
import requests
from ..util.dto import GoalDto
import logging

api = GoalDto.api
# URL of the JSON file in the public Git repo
json_url = "https://raw.githubusercontent.com/Esri/sdg-api/master/data/goals-final.json"

# Fetch the JSON data
response = requests.get(json_url)
goals_data = response.json()

# Route to get all goals
@api.route('/')
class GoalList(Resource):
    def get(self):
        return jsonify(goals_data)

# Route to get a specific goal by its number
@api.route('/<int:goal_number>')
@api.param('goal_number', 'Goal identifier')
class Goal(Resource):
    def get(self,goal_number):

        if goals_data[goal_number] is not None:
            return jsonify(goals_data[goal_number])
        else:
            return jsonify({'error': 'Goal not found'}), 404