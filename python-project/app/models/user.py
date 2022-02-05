from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    biography = db.Column(db.String())
    hashed_password = db.Column(db.String(255), nullable=False)

    likes = relationship("Like", back_populates="user")
    follows=relationship("Follow", back_populates="following")
    follower=relationship("Follow", back_populates="follower")
    posts = relationship("Post", back_populates='user')
    users = relationship("User", back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    followers_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    follower = relationship('User', foreign_keys=[followers_id])
    following = relationship('User', foreign_keys=[following_id])
