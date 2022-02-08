from flask import Blueprint, jsonify, session, request
from app.models import User, Post, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload, selectinload

post_routes = Blueprint('posts', __name__)


@post_routes.route('/photofeed/<int:id>')
# @login_required
def photoFeed(id):
    current_user = User.query.get(id)

    res = {}

    posts = [post for user in current_user.followers for post in user.posts]
    for post in posts:
        res[post.id] = post.to_dict()

    return jsonify(res)


@post_routes.route('/user/<int:userId>')
def getUserPosts(userId):
    posts = Post.query.filter(userId == Post.user_id).all()
    print('POOOOOOST', posts)
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

    # form = AddPostForm()
    # post = Post(user_id=current_user.id, image="form.data['image'], caption=form.data['post'])
    # print('HAYYYYYY', request.json)
    post = Post(user_id=request.json['user_id'], image=request.json['image'], caption=request.json['caption'])
    db.session.add(post)
    db.session.commit()
    return post.to_dict()



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
