# Imports
from click.parser import split_arg_string
import flask
import time
#import firebase_admin  # import firebase_dependencies
import pyrebase
import json
#from firebase_admin import credentials, auth   - fbAdmin not working -> delete for now
from flask import Flask, request
import backend.src.firebase as fb 
from backend.src.algo import matchfilm
import sys


# App configuration
app = flask.Flask("__main__")

# Connect to firebase
#cred = credentials.Certificate('fbAdminConfig.json') - fbAdmin not working -> delete for now
#firebase = firebase_admin.initialize_app(cred)       - fbAdmin not working -> delete for now
pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))
auth = pb.auth()

# Data source - unecessary tho
users = [{'uid': 1, 'name': 'Noah Schrainer'}]

'''
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
    ''' # - fbAdmin not working -> delete for now


@app.route("/api/signUp")
def signup():
    fb.signup()

# Api route to get a new token for a valud user
@app.route("/api/token")
def token():
    fb.token()

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
