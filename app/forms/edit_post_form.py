from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class EditPostForm(FlaskForm):
    caption = TextAreaField('caption')
