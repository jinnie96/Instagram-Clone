from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_required

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/p/<int:postId>/comments')
@login_required
def getComment():
    return


@comment_routes.route('/p/<int:postId>/comments', methods=["POST"])
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
