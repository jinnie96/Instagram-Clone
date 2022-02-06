from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:id>/likes')
def getLike():
    return

@like_routes.route('/<int:id>/likes', methods=["POST"])
def editLike():
    return

@like_routes.route('/<int:id>/likes/<int:id>', methods=["DELETE"])
def deleteLike():
    return
