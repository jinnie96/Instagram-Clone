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
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    biography = db.Column(db.String())
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

    def followed_posts(self):
        return Post.query.filter(Post.user_id.in_([f.id for f in self.followers if f.is_following(self)]))

    def is_following(self, user):
        return self.followers.filter(follows.c.followed_id == user.id).count() > 0

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
            'email': self.email,
            # 'followers': self.followers
        }
