from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

session_routes = Blueprint('session', __name__, url_prefix='/session')

@session_routes.route('/signup')
def signup():
    return

@session_routes.route('/signup', methods=["POST"])
def signupPost():
    return

@session_routes.route('/login')
def login():
    return

@session_routes.route('/login', methods=["POST"])
def loginPost():
    return

@session_routes.route('/logout', methods=["POST"])
def logoutPost():
    return
