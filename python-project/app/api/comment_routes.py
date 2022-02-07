from flask import Blueprint, jsonify, session, request
from itsdangerous import json
from app.models import Comment
from flask_login import current_user, login_required

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/posts/<int:postId>/comments')
# @login_required
def getComment(postId):
    res = Comment.query.filter(Comment.post_id == postId).all()

    return {
        "comments": [comment.serialize() for comment in res]
    }


@comment_routes.route('/posts/<int:postId>/comments', methods=["POST"])
@login_required
def newComment():
    return


@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editComment():
    return


@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteComment():
    return
