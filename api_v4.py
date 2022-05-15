from app import app
from models import UserModel as user
from api_v1 import *
from functools import wraps
from flask import request, abort


@app.route('/api/v4/register', methods=['POST'])
def register_v4():
    return register()


def require_appkey(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        if request.args.get('key') and request.args.get('key') == '1234567890':
            return view_function(*args, **kwargs)
        elif request.headers.get('key') and request.headers.get('key') == '1234567890':
            return view_function(*args, **kwargs)
        else:
            abort(401)
    return decorated_function
        
@app.route('/api/v4/users', methods=['GET'])
@require_appkey
def find_user_v4():
    return find_user()

@app.route('/api/v4/users', methods=['DELETE'])
@require_appkey
def delete_user_v4():
    return delete_user()


@app.route('/api/v4/tasks', methods=['POST'])
@require_appkey
def create_task_v4():
    return create_task()
    
    
@app.route('/api/v4/tasks', methods=['GET'])
@require_appkey
def get_user_tasks_v4():
    return get_user_tasks()

@app.route('/api/v4/tasks', methods=['PUT'])
@require_appkey
def modify_task_v4():
    return modify_task()
    
@app.route('/api/v4/tasks', methods=['DELETE'])
@require_appkey
def delete_task_v4():
    return delete_task()