from flask import Blueprint
from .project_routes import project_routes
from .task_routes import task_routes
from .ai_routes import ai_routes

api_blueprint = Blueprint('api', __name__)

api_blueprint.register_blueprint(project_routes)
api_blueprint.register_blueprint(task_routes)
api_blueprint.register_blueprint(ai_routes)