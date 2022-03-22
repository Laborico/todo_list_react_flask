from app import app
from flask import request, jsonify
from models import db, UserModel as user, TaskModel as task
import re

@app.route('/api/v1/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    
    if username is None or password is None or email is None:
        response = "Error: Missing the following parameters: "
        response +=  "email " if email is None else ""
        response +=  "username " if username is None else ""
        response +=  "password " if password is None else ""
        
        return response, 400
    
    if user.query.filter_by(email = email).first():
        return "Error: Email already registered!", 400
    
    if not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email):
        return "Error: Invalid email", 400
    
    new_user = user(username = username, email = email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return (jsonify(
        id = new_user.user_id,
        email = new_user.email,
        username = new_user.username, 
        ), 201)
    
    
@app.route('/api/v1/users', methods=['GET'])
def find_user():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id provided. Please provide an id." , 400
    
    user_data = user.query.filter_by(user_id = id).first()
    
    if user_data is None:
        return "Error: User not found!", 404
    
    return (jsonify(
        username = user_data.username,
        email = user_data.email
        ), 200)


@app.route('/api/v1/users', methods=['DELETE'])
def delete_user():
    if 'user_id' in request.args:
        user_id = int(request.args['user_id'])
    else:
        return "Error: No user_id provided. Please provide a user_id." , 400

    user_data = user.query.get(user_id)

    db.session.delete(user_data)
    db.session.commit()

    return 'User deleted sucessfully!', 200
    
@app.route('/api/v1/tasks', methods=['POST'])
def create_task():
    
    user_id = request.json.get('user_id')
    task_name = request.json.get('task_name')
    task_desc = request.json.get('task_desc')
   
   
    if user_id is None or task_name is None:
        response = "Error: Missing the following parameters: "
        response +=  "user_id " if user_id is None else ""
        response +=  "task_name " if task_name is None else ""
        
        return response, 400
    
    if task_desc is None:
        task_desc = ""
    
    new_task = task(user_id = user_id, task_name = task_name, task_desc = task_desc)
    db.session.add(new_task)
    db.session.commit()
    return (jsonify(
        task_id = new_task.task_id,
        task_name = new_task.task_name,
        task_desc = new_task.task_desc, 
        ), 201)
    
    
@app.route('/api/v1/tasks', methods=['GET'])
def get_user_tasks():
    if 'user_id' in request.args:
        user_id = int(request.args['user_id'])
    else:
        return "Error: No user_id provided. Please provide a user_id." , 400
    
    user_tasks = task.query.filter_by(user_id = user_id).all()
    
    response = {}
    
    for i, user_task in enumerate(user_tasks):
        response[i] = {
            'task_id' : user_task.task_id,
            'task_name': user_task.task_name,
            'task_desc': user_task.task_desc
        }
            
    return  (jsonify(response), 200)

@app.route('/api/v1/tasks', methods=['PUT'])
def modify_task():
    task_id = request.json.get('task_id')
    task_name = request.json.get('task_name')
    task_desc = request.json.get('task_desc')
   
   
    if task_id is None:
        return "Error: No task_id provided. Please provide a task_id." , 400
    
    task_data = task.query.get(task_id)
    
    if task_name is not None:
        task_data.task_name = task_name
        
    if task_desc is not None:
        task_data.task_desc = task_desc
        
    db.session.commit()
    
    return (jsonify(
        task_id = task_id,
        task_name = task_name,
        task_desc = task_desc
        ), 200)
    
@app.route('/api/v1/tasks', methods=['DELETE'])
def delete_task():
    if 'task_id' in request.args:
        task_id = int(request.args['task_id'])
    else:
        return "Error: No task_id provided. Please provide a task_id." , 400
    
    
    task_data = task.query.get(task_id)
    
    db.session.delete(task_data)
    db.session.commit()
    
    return 'Task deleted succesfully!', 200
    