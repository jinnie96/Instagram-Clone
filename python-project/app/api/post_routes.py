from flask import Blueprint, jsonify, session, request
from app.models import User, Post, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload, selectinload

post_routes = Blueprint('posts', __name__)


@post_routes.route('/photofeed/<int:id>')
# @login_required
def photoFeed(id):
    current_user = User.query.get(id)
    # followers = db.session.query(User).options(joinedload(User.followers)).all()

    # print("@@@@@@@@", followers.followed_posts())
    # res = {}

    # for follow in followers:
    #     res[follow.id] = follow.to_dict()
    res = {}
    posts = current_user.followed_posts()

    for post in posts:
        print(post)
        res[post.id] = post.to_dict()

    return jsonify(res)

@post_routes.route('/<int:id>')
def getOnePost(id):
    post = Post.query.get(id)
    return post


@post_routes.route('/create', methods=["POST"])
@login_required
def newPost():
    return



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
