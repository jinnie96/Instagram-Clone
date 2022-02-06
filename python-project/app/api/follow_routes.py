from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

follow_routes = Blueprint('following', __name__)

@follow_routes.route('/<int:id>/<int:id>')
def getFollow():
    return

@follow_routes.route('/', methods=["POST"])
def editFollow():
    return
