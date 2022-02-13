from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()

    if username == current_user.username:
        return
    elif user:
        raise ValidationError('Username is already in use.')

class EditProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    email= StringField('email')
    biography = TextAreaField('biography')
    # profile_picture = StringField('profileURL')
