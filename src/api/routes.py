"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



api = Blueprint('api', __name__)
app = Flask(__name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/user', methods=['POST'])
def create_user():
    try:
        new_user = request.json
        email = new_user.get('email')
        password = new_user.get('password')
        usuario = User(email=email, password=password)
        db.session.add(usuario)
        db.session.commit()
        return jsonify({"msg": "create user"}),201
    
    except Exception as e:
        return jsonify({"error": str(e)}),400
    

@api.route('/login', methods=['POST'])
def login_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        user = User.query.filter_by(email=email, password=password).first()
        if user is None:
            return jsonify({"msg": "Bad username or password"}),401
        
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user_id": user.id }),200
    except Exception as e:
        return jsonify({ "error": str(e) })
    
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        return jsonify({"id": user.id, "email": user.email }), 200
    except Exception as e:
        return jsonify({"error": str(e)})