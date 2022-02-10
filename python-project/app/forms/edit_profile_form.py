from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class EditProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    first_name = StringField('first name')
    last_name = StringField('last name')
    email= StringField('email')
    biography = StringField('bio')
    profile_picture = StringField('profileURL')
