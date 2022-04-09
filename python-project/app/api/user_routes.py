from flask import Blueprint, jsonify, request
from flask_login import login_required
from itsdangerous import json
from app.models import User, Post, db
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
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/search', methods=["PUT"])
def userSearch():
    print(request.json['search'], "GGGGG")
    term = request.json['search']
    print(type(term), "FFFFFFF")
    users = User.query.all()
    # users = User.query.filter(User.last_name.like(f'{term}'), User.first_name.like(f'{term}'), User.username.like(f'{term}')).all()
    print("USERS", type(users))
    searchArr = []
    for user in users:
        if term in user.username or term in user.first_name or term in user.last_name:
            print(user.id)
            searchArr.append(user)
    print("NWW", searchArr)
    return {'users': [user.to_dict() for user in searchArr]}

@user_routes.route('/hashtag', methods=["PUT"])
def userSearchHashtag():
    print(request.json, "GGGGG")
    term = request.json
    tags = []
    print(type(term), "FFFFFFF")
    posts = Post.query.all()
    print("@@@@", posts)
    for post in posts:
        print("##############", post.caption.includes(term))
        # if (post.caption.includes(term)):
            # tags.append



@user_routes.route('/demo')
def demo_user():
    demo = User.query.get(1)
    return demo.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)

    return user.to_dict()


@user_routes.route('/<int:id>/account/edit', methods=["PUT"])
@login_required
def editProfile(id):
    form = EditProfileForm()
    user_id = id
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(user_id)
        if form.data['username'] != user.username:
            user.username = form.data['username']
        if form.data['username'] == user.username:
            user.username = form.data['username']
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.email = form.data['email']
        user.biography = form.data['biography']
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
