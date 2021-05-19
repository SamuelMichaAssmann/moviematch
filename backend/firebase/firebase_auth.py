import logging
from os import system
import pprint
import pyrebase
import json
#from firebase_admin import credentials, auth
from flask import Flask, request
import backend.firebase.firebase_db  as db



pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))
auth = pb.auth()



def check_token(f):  # middleware - check for valid token before performing fb_user action - not needed anymore
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



def signup(request):
    email = request.json['email']
    password = request.json['password']

    if (email is None or password is None):
        return {'message': 'Error missing email or password'}, 400
    try:
        print("creating user")
        user = auth.create_user_with_email_and_password(
            email=email,
            password=password
        )
        pprint.pprint(user)
        print("\nuser created")
        print("\nwriting user to database")

        try:
            db.pushNewUser(user['localId'], user['email'])
        except Exception as e:
            print("failed to push User to db\n" + str(e))
            return {'message': f"Failed to push User to db {e}"}, 400

        return {'message': f"Successfully created user {user['localId']}"}, 201
    except Exception as e:
        print("Errormsg: \n" + str(e))
        return {'message': 'Error creating user \n ' + str(e)}, 400



def signIn(request):
    email = request.json['email']
    password = request.json['password']

    try:
        user = auth.sign_in_with_email_and_password(
            email,
            password
        )
        userid = user['localId']
        jwt = user['idToken']
        return {
            'token': jwt,
            'id': userid}, 200
    except:
        return {'message': 'There was an error logging in'}, 400




