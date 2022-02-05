from .db import db
from sqlalchemy.orm import relationship

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image = db.Column(db.Text, nullable=False)
    caption = db.Column(db.Text)

    likes = relationship("Like", back_populates='post')
    user = relationship("User", back_populates='posts')
    posts = relationship("Comment", back_populates='posts')
    

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = relationship('User', back_populates="likes")
    post = relationship('Post', back_populates="likes")
