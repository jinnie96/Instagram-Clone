from flask import Blueprint, jsonify
from flask_login import login_required
from itsdangerous import json
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    current_user = User.query.get(id)

    return current_user.to_dict()


@user_routes.route('/<username>/account/edit', methods=["PUT"])
@login_required
def editProfile():
    return
