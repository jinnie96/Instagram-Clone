from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('Email provided not found.')


# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email = form.data['email']
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('No such user exists.')
#     if not user.check_password(password):
#         raise ValidationError('Password was incorrect.')


class AddPostForm(FlaskForm):
    image = StringField('image', validators=[DataRequired()])
    caption = TextAreaField('caption', validators=[DataRequired()])
