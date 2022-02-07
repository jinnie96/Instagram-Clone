from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__, url_prefix='/comments')

@comment_routes.route('/<int:id>/comments')
def getComment():
    return

@comment_routes.route('/<int:id>/comments', methods=["POST"])
def newComment():
    return

@comment_routes.route('/<int:id>', methods=["PUT"])
def editComment():
    return

@comment_routes.route('/<int:id>', methods=["DELETE"])
def deleteComment():
    return
