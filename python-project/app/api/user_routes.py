from flask import Blueprint, jsonify, request
from flask_login import login_required
from itsdangerous import json
from app.models import User, db
from app.forms.edit_profile_form import EditProfileForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
    form = EditProfileForm()
    user_id = request.json['id']
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.validate_on_submit())
    if form.validate_on_submit():
        user = User.query.get(user_id)
        if form.data['username'] != user.username:
            user.username = form.data['username']
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.email = form.data['email']
        user.biography = form.data['biography']
        user.profile_picture = form.data['profile_picture']
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
