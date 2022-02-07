from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

follow_routes = Blueprint('following', __name__)

# Following
@follow_routes.route('/<username>/following')
def getFollow():
    return

@follow_routes.route('/<username>/following', methods=["GET", "POST"])
def newFollow():
    return

@follow_routes.route('/<username>/following/<int:id>', methods=["DELETE"])
def deleteFollow():
    return

# Followers
@follow_routes.route('/<username>/followers')
def getFollower():
    return

@follow_routes.route('/<username>/followers/<int:id>', methods=["DELETE"])
def deleteFollower():
    return
