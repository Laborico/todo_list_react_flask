from functools import wraps
import jwt
from flask import request, abort, jsonify
from flask import current_app
from models import UserModel as user

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return (jsonify(
                message = "Authentication Token is missing!",
                error = "Unauthorized"
            ), 401)
        try:
            data = jwt.decode(
                token, 
                current_app.config["SECRET_KEY"], 
                algorithms=["HS256"]
            )
            
            current_user = user.query.filter_by(user_id = data['user_id']).first()
            
            if current_user is None:
                return (jsonify(
                    message = "Invalid Token!",
                    error = "Unauthorized"
                ), 401)

                
        except Exception as e:
           return (jsonify(
                    message = "Something went wrong :c",
                    error = str(e)
                ), 500)

        return f(*args, **kwargs)

    return decorated