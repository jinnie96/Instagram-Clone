from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class EditProfileForm(FlaskForm):
    username = StringField('username')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    email= StringField('email')
    biography = TextAreaField('biography')
    # profile_picture = StringField('profileURL')
