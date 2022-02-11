from flask import Blueprint, jsonify, session, request
from itsdangerous import json
from app.models import Comment, db
from flask_login import current_user, login_required
from app.forms.comment_form import NewCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/posts/<int:postId>/comments')
# @login_required
def getComment(postId):
    res = Comment.query.filter(Comment.post_id == postId).all()
    for comment in res:
        print("TEST COMMENT SERIAL", comment.serialize())
    return {
        "comments": [comment.serialize() for comment in res]
    }


@comment_routes.route('/posts/<int:postId>/comments', methods=["POST"])
@login_required
def new_comment(postId):
    data = request.json
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        commentNew = Comment(
            user_id=data['user_id'],
            post_id=data['post_id'],
            comment=form.data['comment']
        )
        db.session.add(commentNew)
        db.session.commit()
        return commentNew.to_dict()
    return (form.errors)



@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.comment = form.data['comment']
        db.session.commit()
        return {'comment': comment.to_dict()}
    return "comment updated"



@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return "Comment deleted"
