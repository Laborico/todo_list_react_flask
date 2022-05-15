from app import app
from flask import request, jsonify
from models import UserModel as user
from api_v1 import *
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()

@app.route('/api/v3/register', methods=['POST'])
def register_v3():
    return register()


@auth.verify_password
def login_v3(username, password):
    
    if username is None or password is None:
        return False
    
    user_data = user.query.filter_by(username = username).first()
    
    if not user_data:
        return False
    
    if not user_data.check_password(password):
        return False
    
    return True
        
@app.route('/api/v3/users', methods=['GET'])
@auth.login_required
def find_user_v3():
    return find_user()

@app.route('/api/v3/users', methods=['DELETE'])
@auth.login_required
def delete_user_v3():
    return delete_user()


@app.route('/api/v3/tasks', methods=['POST'])
@auth.login_required
def create_task_v3():
    return create_task()
    
    
@app.route('/api/v3/tasks', methods=['GET'])
@auth.login_required
def get_user_tasks_v3():
    return get_user_tasks()

@app.route('/api/v3/tasks', methods=['PUT'])
@auth.login_required
def modify_task_v3():
    return modify_task()
    
@app.route('/api/v3/tasks', methods=['DELETE'])
@auth.login_required
def delete_task_v3():
    return delete_task()