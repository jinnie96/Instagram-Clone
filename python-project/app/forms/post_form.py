from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post

# def image_check(form, field):
#     image = field.data;

#     if not image:
#         raise ValidationError('Image required.')

class AddPostForm(FlaskForm):
    image = TextAreaField('image', validators=[DataRequired()])
    caption = TextAreaField('caption')
