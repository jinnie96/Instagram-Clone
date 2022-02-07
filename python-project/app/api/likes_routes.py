from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

like_routes = Blueprint('likes', __name__)

@like_routes.route('/p/<int:id>/likes')
def getLike():
    return

@like_routes.route('/p/<int:id>/likes', methods=["GET", "POST"])
def newLike():
    return

@like_routes.route('/likes/<int:id>', methods=["DELETE"])
def deleteLike():
    return
