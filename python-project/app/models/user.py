from operator import and_
from sqlalchemy import alias
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship

from .post import Post, likes

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    biography = db.Column(db.String(), nullable=True)
    profile_picture = db.Column(db.Text(), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = relationship("Post", foreign_keys="Post.user_id", back_populates='user')
    comment = relationship("Comment", foreign_keys="Comment.user_id", back_populates='users')

    followers = relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("follows"),
        lazy='dynamic'
    )

    users = relationship(
        "Post",
        secondary=likes,
        back_populates="post"
    )


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
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'biography': self.biography,
            'profile_picture': self.profile_picture
        }
