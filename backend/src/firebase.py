import pyrebase
import json
#from firebase_admin import credentials, auth
from flask import Flask, request


def check_token(f):  # middleware - check for valid token before performing fb_user action
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.headers.get('authorization'):
            return {'message': 'No token provided'}, 400
        try:
            user = auth.verify_id_token(request.headers['authorization'])
            request.user = user
        except:
            return {'message': 'Invalid token provided'}, 400
        return f(*args, **kwargs)
    return wrap


def signup():
    def signup():
    
    email = request.form.get('email')
    password = request.form.get('password')
    #email = args["email"]
    #password = args["password"]

    

    if (email is None or password is None):
        return {'message': 'Error missing email or password'}, 400
    try:
        user = auth.create_user_with_email_and_password(
            email=email,
            password=password
        )
        return {'message': f'Successfully created user {user.uid}'}, 201
    except:
        return {'message': 'Error creating user'}, 400



def token():
    email = request.form.get('email')
    password = request.form.get('password')

    try:
        user = pb.auth().sign_in_with_email_and_password(
            email,
            password
        )
        jwt = user['idToken']
        return {'token': jwt}, 200
    except:
        return {'message': 'There was an error logging in'}, 400
