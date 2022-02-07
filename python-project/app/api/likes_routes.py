from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

like_routes = Blueprint('likes', __name__, url_prefix='/likes')

@like_routes.route('/<int:id>')
def getLike():
    return

@like_routes.route('/<int:id>', methods=["POST"])
def newLike():
    return

@like_routes.route('/<int:id>', methods=["DELETE"])
def deleteLike():
    return
