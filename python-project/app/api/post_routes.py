from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>/posts')
def photoFeed():
    return

@post_routes.route('/create', methods=["GET", "POST"])
def newPost():
    return

@post_routes.route('/p/<int:id>', methods=["PUT"])
def editPost():
    return

@post_routes.route('/p/<int:id>', methods=["DELETE"])
def deletePost():
    return
