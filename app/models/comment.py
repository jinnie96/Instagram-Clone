from click import edit
from .db import db
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    comment = db.Column(db.Text, nullable=False)
    edited = db.Column(db.Boolean, nullable=False)

    users = relationship("User", foreign_keys=[user_id], overlaps="comment")
    posts = relationship("Post", foreign_keys=[post_id])

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment": self.comment,
            "edited": self.edited
        }
