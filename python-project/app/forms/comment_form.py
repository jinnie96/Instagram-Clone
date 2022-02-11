from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired
from app.models import Comment

class NewCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    edited = BooleanField('edited')
