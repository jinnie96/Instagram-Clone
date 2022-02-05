from .db import db
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comment = db.Column(db.Text, nullable=False)
    edited = db.Column(db.Boolean, nullable=False)

    users = relationship("User", back_populates='users')
    posts = relationship("Post", back_populates='posts')
