from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

profile_routes = Blueprint('profile', __name__)

@follow_routes.route('/<username>')
def getProfile():
    return

@post_routes.route('/<username>/account/edit', methods=["PUT"])
def editProfile():
    return
