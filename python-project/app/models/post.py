from .db import db
from sqlalchemy.orm import relationship

likes = db.Table(
    "likes",
    db.Column("users_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("posts_id", db.Integer, db.ForeignKey("posts.id")),
)

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image = db.Column(db.Text, nullable=False)
    caption = db.Column(db.Text)

    user = relationship("User", foreign_keys=[user_id], overlaps="posts")
    comment = relationship("Comment", foreign_keys="Comment.post_id", overlaps="posts")

    post = relationship(
        "User",
        secondary=likes,
        back_populates="users"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image': self.image,
            'caption': self.caption
        }
