from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follow', __name__)


# Following
@follow_routes.route('/following')
@login_required
def getFollow():
    print("@@@@@@@")
    return


@follow_routes.route('/following', methods=["POST"])
@login_required
def newFollow():
    return


@follow_routes.route('/following/<int:id>', methods=["DELETE"])
@login_required
def deleteFollow():
    return


# Followers
@follow_routes.route('/followers')
@login_required
def getFollower():
    return


@follow_routes.route('/followers/<int:id>', methods=["DELETE"])
@login_required
def deleteFollower():
    return
