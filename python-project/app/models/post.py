from .db import db
from sqlalchemy.orm import relationship

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image = db.Column(db.Text, nullable=False)
    caption = db.Column(db.Text)

    user = relationship("User", foreign_keys=[user_id])
    likes = relationship("Like", foreign_keys="Like.post_id")
    comment = relationship("Comment", foreign_keys="Comment.post_id")


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = relationship('User', foreign_keys=[user_id])
    post = relationship('Post', foreign_keys=[post_id])
