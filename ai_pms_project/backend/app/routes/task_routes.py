from flask import Blueprint, jsonify, request
from app.models.task import Task

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/tasks', methods=['GET'])
def get_tasks():
    # Implement task fetching logic
    return jsonify({'tasks': []})

@task_routes.route('/tasks', methods=['POST'])
def create_task():
    # Implement task creation logic
    return jsonify({'message': 'Task created successfully'}), 201