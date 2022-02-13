from flask import Blueprint, jsonify, session, request
from itsdangerous import json
from app.models import User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follow', __name__)


# Following
@follow_routes.route('/<int:id>/following')
@login_required
def getFollow(id):
    current_user = User.query.get(id)

    res = {}


    for name in current_user.followers:
        res[name.id] = name.to_dict()

    return jsonify(res)


@follow_routes.route('/<int:userId>/following/<int:targetId>', methods=["POST"])
@login_required
def newFollow(userId, targetId):
    current_user = User.query.get(userId)
    target_user = User.query.get(targetId)

    current_user.followers.append(target_user)
    db.session.commit()


    res = {}

    for name in current_user.followers:
        res[name.id] = name.to_dict()

    return jsonify(res)


@follow_routes.route('/<int:userId>/following/<int:targetId>', methods=["DELETE"])
@login_required
def deleteFollow(userId, targetId):
    current_user = User.query.get(userId)
    target_user = User.query.get(targetId)

    current_user.followers.remove(target_user)
    db.session.commit()

    res = {}

    for name in current_user.followers:
        res[name.id] = name.to_dict()

    return jsonify(res)


# Followers
@follow_routes.route('/<int:id>/followers')
@login_required
def getFollower(id):
    current_user = User.query.get(id)

    res = {}
    for user in current_user.following:
        res[user.id] = user.to_dict()

    return jsonify(res)



@follow_routes.route('/<int:userId>/followers/<int:targetId>', methods=["DELETE"])
@login_required
def deleteFollower(userId, targetId):
    current_user = User.query.get(userId)
    target_user = User.query.get(targetId)

    current_user.following.remove(target_user)
    db.session.commit()

    res = {}

    for user in current_user.following:
        res[user.id] = user.to_dict()

    return jsonify(res)
