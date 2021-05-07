# Imports
import flask
import time
import firebase_admin  # import firebase_dependencies
import pyrebase
import json
from firebase_admin import credentials, auth
from flask import Flask, request
import src.firebase
from src.algo import matchfilm


# App configuration
app = flask.Flask("__main__")


# Connect to firebase
cred = credentials.Certificate('fbAdminConfig.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))

# Data source - unecessary tho
users = [{'uid': 1, 'name': 'Noah Schrainer'}]


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


@app.route("/api/signUp")
# signup


# Api route to get a new token for a valud user
@app.route("api/token")
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


@app.route("/api")
def version():
    return "Api v0.1.0"


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/match')
def getMovieData():
    return matchfilm()


if __name__ == "__main__":
    app.run(port=5000, debug=True)
