from flask import Blueprint, jsonify, session, request
from app.models import User, Post, Follow, db
from flask_login import current_user, login_required

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def photoFeed():
    posts = Post.query.all()
    if User.

@post_routes.route('/<int:id>')
def getOnePost(id):
    post = Post.query.get(id)
    return post


@post_routes.route('/create', methods=["POST"])
@login_required
def newPost():



@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editPost():
    return


@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deletePost(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return
