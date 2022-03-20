from app import app
from flask import request, jsonify
from auth_middleware import token_required
from models import db, UserModel as user, TaskModel as task
from api_v1 import *
import jwt
import time


@app.route('/api/v2/register', methods=['POST'])
def register_v2():
    return register()


@app.route('/api/v2/login', methods=['POST']) 
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    if email is None or password is None:
        response = 'Error: please provide '
        response += "email " if email is None else ""
        response += "password" if password is None else ""
        
        return response, 400
    
    user_data = user.query.filter_by(email = email).first()
    
    if not user_data:
        return "Error: user not found", 404
    
    if not user_data.check_password(password):
        return "Invalid password!", 403
    
    token = jwt.encode({
        'user_id' : user_data.user_id, 
        'exp' : time.time() + 600
        }, app.config['SECRET_KEY'], "HS256")
    
    return (jsonify(
        message = "Login sucessfull",
        token = token), 200)
    
    
    
    
@app.route('/api/v2/users', methods=['GET'])
@token_required
def find_user_v2():
    return find_user()
    
@app.route('/api/v2/tasks', methods=['POST'])
@token_required
def create_task_v2():
    return create_task()
    
    
@app.route('/api/v2/tasks', methods=['GET'])
@token_required
def get_user_tasks_V2():
    return get_user_tasks()

@app.route('/api/v2/tasks', methods=['PUT'])
@token_required
def modify_task_v2():
    return modify_task()
    
@app.route('/api/v2/tasks', methods=['DELETE'])
@token_required
def delete_task_v2():
    return delete_task()