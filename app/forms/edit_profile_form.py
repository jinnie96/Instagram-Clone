from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User

def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()

    if email == current_user.email:
        return
    elif user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()

    if username == current_user.username:
        return
    elif user:
        raise ValidationError('Username is already in use.')

class EditProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email= StringField('email', validators=[DataRequired(), user_exists, Email()])
    biography = TextAreaField('biography')
    # profile_picture = StringField('profileURL')
