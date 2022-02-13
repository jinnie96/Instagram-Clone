from importlib.metadata import requires
from flask import Blueprint, jsonify, redirect, session, request
from app.models import User, Post, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload, selectinload
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms import AddPostForm
import json

post_routes = Blueprint('posts', __name__)



@post_routes.route('/photofeed/<int:id>')
# @login_required
def photoFeed(id):
    current_user = User.query.get(id)
    current_user_posts = Post.query.filter(Post.user_id == id).all()
    res = {}

    posts = [post for user in current_user.followers for post in user.posts]

    # User does not follow anyone, and does not have posts
    if not posts and not current_user_posts:
        # print('--------- first')
        posts = Post.query.all()
        res = {}
        for post in posts:
            user = User.query.get(post.user.id)
            username = user.username
            res[post.id] = post.to_dict()
            res[post.id]["username"] = f'{username}'
        return res
    # User does not follow anyone, and has their own posts
    elif not posts and current_user_posts:
        # print('--------- second')
        res = {}
        for post in current_user_posts:
            user = User.query.get(post.user.id)
            username = user.username
            res[post.id] = post.to_dict()
            res[post.id]["username"] = f'{username}'
        return res
    # User follows + do/do not have their own posts
    else:
        # print('--------- third')
        for post in posts:
            user = User.query.get(post.user.id)
            username = user.username
            res[post.id] = post.to_dict()
            res[post.id]["username"] = f'{username}'
        for post in current_user_posts:
            user = User.query.get(post.user.id)
            username = user.username
            res[post.id] = post.to_dict()
            res[post.id]["username"] = f'{username}'
        return res



@post_routes.route('/user/<int:userId>')
def getUserPosts(userId):
    posts = Post.query.filter(userId == Post.user_id).all()

    return {
        "posts": [post.to_dict() for post in posts]
    }


@post_routes.route('/<int:id>')
def getOnePost(id):
    post = Post.query.get(id)
    # print('HELOOOOOOOOOOOOOO', post.to_dict())
    return post.to_dict()


@post_routes.route('/create', methods=["POST"])
# @login_required
def newPost():
    form = AddPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if "image" not in request.files:
            print("Error 1")
            return {"errors": "image required"}, 400

        image = request.files['image']
        print("@@@@@@@@@@@@@@@@@@@@@@@@@", image)

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400


        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        post = Post(user_id=current_user.id, image=url, caption=form.data['caption'])

        db.session.add(post)
        db.session.commit()
        print("POST")

        return post.to_dict()
    return (form.errors)

@post_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def editPost(id):
    print("BEFORE QUERY")
    post = Post.query.get(id)
    print("AFTER QUERY", post)
    # print("REQ CAPTION!!!!!!!!", request.files['caption'])
    print("REQ CAPTION!!!!!!!!", json.loads(request.data)["comment"])
    post.caption=json.loads(request.data)["comment"]
    print("AFTER EDIT", post)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def deletePost(id):
    post = Post.query.get(id)
    print("BEFORE DELETE", post)
    db.session.delete(post)
    print("AFTER DELETE")
    db.session.commit()
    return post.to_dict()
