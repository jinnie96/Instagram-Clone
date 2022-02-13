from flask import Blueprint, jsonify, session, request
from itsdangerous import json
from app.models import User, Post, db
from flask_login import current_user, login_required

like_routes = Blueprint('likes', __name__)


@like_routes.route('/p/<int:postId>/likes')
def getLike(postId):
    current_post = Post.query.get(postId)

    res = {}
    for user in current_post.like:
        res[user.id] = user.to_dict()

    return jsonify(res)


@like_routes.route('/p/<int:postId>/likes', methods=["POST"])
@login_required
def newLike(postId):
    target_post = Post.query.get(postId)

    target_post.like.append(current_user)
    db.session.commit()

    res = {}
    for user in target_post.like:
        res[user.id] = user.to_dict()

    return jsonify(res)


@like_routes.route('/p/<int:postId>/likes/<int:userId>', methods=["DELETE"])
@login_required
def deleteLike(postId, userId):
    target_post = Post.query.get(postId)
    target_user = User.query.get(userId)

    target_post.like.remove(target_user)
    db.session.commit()

    res = {}
    for user in target_post.like:
        res[user.id] = user.to_dict()

    return jsonify(res)
