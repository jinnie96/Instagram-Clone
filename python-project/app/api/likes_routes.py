from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_required

like_routes = Blueprint('likes', __name__)


@like_routes.route('/p/<int:postId>/likes')
@login_required
def getLike():
    return


@like_routes.route('/p/<int:postId>/likes', methods=["POST"])
@login_required
def newLike():
    return


@like_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteLike():
    return
