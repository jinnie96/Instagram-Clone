from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

follow_routes = Blueprint('following', __name__, url_prefix='/following')
follower_routes = Blueprint('following', __name__, url_prefix='/followers')

# Following
@follow_routes.route('/')
def getFollow():
    return

@follow_routes.route('/', methods=["GET", "POST"])
def newFollow():
    return

@follow_routes.route('/<int:id>', methods=["DELETE"])
def deleteFollow():
    return

# Followers
@follower_routes.route('/')
def getFollower():
    return

@follower_routes.route('/<int:id>', methods=["DELETE"])
def deleteFollower():
    return
