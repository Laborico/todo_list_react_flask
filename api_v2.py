from app import app
from flask import request, jsonify
from models import UserModel as user
from api_v1 import *
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    create_refresh_token, get_jwt_identity
)

jwt = JWTManager(app)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600

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
    
    return (jsonify(
        access_token = create_access_token(identity=user_data.user_id),
        refresh_token = create_refresh_token(identity=user_data.user_id))
    , 200)
    
    
@app.route('/api/v2/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    return (jsonify(
        access_token = create_access_token(identity=current_user)
        ), 200)
    
@app.route('/api/v2/identity', methods=['GET'])
@jwt_required()
def getidentity():
    return (jsonify(
        id = get_jwt_identity()
    ) , 200)

@app.route('/api/v2/users', methods=['GET'])
@jwt_required()
def find_user_v2():
    return find_user()

@app.route('/api/v2/users', methods=['DELETE'])
@jwt_required()
def delete_user_v2():
    return delete_user()



@app.route('/api/v2/tasks', methods=['POST'])
@jwt_required()
def create_task_v2():
    return create_task()
    
    
@app.route('/api/v2/tasks', methods=['GET'])
@jwt_required()
def get_user_tasks_V2():
    return get_user_tasks()

@app.route('/api/v2/tasks', methods=['PUT'])
@jwt_required()
def modify_task_v2():
    return modify_task()
    
@app.route('/api/v2/tasks', methods=['DELETE'])
@jwt_required()
def delete_task_v2():
    return delete_task()