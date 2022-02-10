from importlib.metadata import requires
from flask import Blueprint, jsonify, redirect, session, request
from app.models import User, Post, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload, selectinload
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms import AddPostForm
import json

post_routes = Blueprint('posts', __name__)

# @post_routes.route('/photofeed')
# # @login_required
# def allPhotosFeed():
#     posts = Post.query.all()
#     res = {}
#     print(posts)
#     for post in posts:
#         res[post.id] = post.to_dict()
#     return res

@post_routes.route('/photofeed/<int:id>')
# @login_required
def photoFeed(id):
    current_user = User.query.get(id)
    current_user_posts = Post.query.filter(Post.user_id == id).all()
    res = {}
    print("CURRENT USER@@@@@", current_user)
    print("CURRENT USER FOLLOWERS@@@@@", current_user.followers)
    # if not current_user.followers:
    #     print("IN NOT FOLLOW@!#!@#@!#!@#!@#!@#")
    #     posts = Post.query.all()
    #     res = {}
    #     print(posts)
    #     for post in posts:
    #         res[post.id] = post.to_dict()
    #     return res
    # else:
    print("HAS FOLLOWING!@#!@#!@#!@#!#")
    posts = [post for user in current_user.followers for post in user.posts]
    if not posts:
        posts = Post.query.all()
        res = {}
        print("NO FOLLOWING", posts)
        for post in posts:
            res[post.id] = post.to_dict()
        return res
    else:
        for post in posts:
            res[post.id] = post.to_dict()
        for post in current_user_posts:
            res[post.id] = post.to_dict()
        return res

    # for post in current_user_posts:
    #     res[post.id] = post.to_dict()


@post_routes.route('/user/<int:userId>')
def getUserPosts(userId):
    posts = Post.query.filter(userId == Post.user_id).all()
    # print('POOOOOOST', posts)
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
# @post_routes.route('/create', methods=["POST"])
# # @login_required
# def newPost():
#     form = AddPostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']


#     # print("@@@@@@@@@@@@@")
#     # print(request.__dict__)
#     if form.validate_on_submit():
#     # print("@@@@@@@", request.files)
#         files = form.data
#         data = json.loads(files['image'])
#         if "image" not in files:
#             return {"errors": "image required"}, 400

#         image = data
#         filename = image['name']
#         if not allowed_file(filename):
#             return {"errors": "file type not permitted"}, 400


#         image.update(filename = get_unique_filename(image['name']))
#         print(image)

#         upload = upload_file_to_s3(image)
#         print("@@@@@@@@@@@@@@@", upload)
#         if "url" not in upload:
#             return print("@@@@@@@@@@@@@@"), upload, 400

#         url = upload["url"]
#         print("URRRRRRRRRRRL", url)
#         post = Post(user_id=current_user.id, image=url, caption=form.data['caption'])

#         print('++++++++++ post', post)

#         # post = Post(user_id=request.json['user_id'], image=request.json['image'], caption=request.json['caption'])
#         db.session.add(post)
#         db.session.commit()
#         print("POST")

#         return post.to_dict()
#     return (form.errors)



@post_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def editPost(id):
    post = Post.query.get(id)
    post.caption=request.json['caption']
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def deletePost(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
