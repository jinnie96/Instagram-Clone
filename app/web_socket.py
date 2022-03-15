import os
from flask_socketio import SocketIO, emit


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://insta-clone-group.herokuapp.com",
        "https://insta-clone-group.herokuapp.com"
    ]
else:
    origins = "*"

# Initialize SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    """
    Handle chat events
    """
    emit("chat", data, broadcast=True) #emits messages to connected users
