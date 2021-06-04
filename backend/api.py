# Imports
import flask
from flask_cors import CORS, cross_origin
import time
#import firebase_admin  # import firebase_dependencies
import pyrebase
import json
#from firebase_admin import credentials, auth   - fbAdmin not working -> delete for now
from backend.firebase import *
from backend.src.match.match import userMovie
from backend.src.match.groups import groupMovie
import backend.firebase.firebase_auth as fb_a 
import backend.firebase.firebase_db as db

# App configuration
app = flask.Flask('__main__')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Connect to firebase
#cred = credentials.Certificate('firebase/fbAdminConfig.json') - fbAdmin not working -> delete for now
#firebase = firebase_admin.initialize_app(cred)       - fbAdmin not working -> delete for now
pb = pyrebase.initialize_app(json.load(open('firebase/fbconfig.json')))
auth = pb.auth()


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

def _build_cors_preflight_response():
    ''' Initializes all necessary parameters for CORS, allowing our website to access the API '''
    response = flask.make_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response


@app.route('/api/signup', methods=['POST', 'OPTIONS'])
@cross_origin()
def signup():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.signup(flask.request)


@app.route('/api/signin', methods=['POST', 'OPTIONS'])
@cross_origin()
def signIn():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.signIn(flask.request)


@app.route('/api/resendV', methods=['POST', 'OPTIONS'])
@cross_origin()
def resendV():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.resendV(flask.request)

@app.route('/api/resetPwd', methods=['POST', 'OPTIONS'])
@cross_origin()
def resetPwd():
     if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
     return fb_a.updatePwd(flask.request)


@app.route('/api', methods=['GET', 'OPTIONS'])
@cross_origin()
def version():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return 'Api v0.1.0'


@app.route('/api/time', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_current_time():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return {'time': time.time()}


@app.route('/api/usermatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_movie_data_user():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return userMovie(flask.request.args.get('user_id'), flask.request.args.get('path'))


@app.route('/api/groupmatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_movie_data_group():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return groupMovie(flask.request.args.get('user_id'), flask.request.args.get('path'), flask.request.args.get('group_id'))


@app.route('/api/groupList', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_group_list():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.get_user_group_info(flask.request.args.get('user_id'))


@app.route('/api/newGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def initializeNewGroup():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.initializeNewGroup(
        flask.request.json['group_name'],
        flask.request.json['members'],
        flask.request.json['owner_id']
    )


@app.route('/api/getGroupInfo', methods=['GET', 'OPTIONS'])
@cross_origin()
def getGroupInfo():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.getGroupInfo(flask.request.args.get('group_id'))


#updateWatchlist - user
#updateAntiwatchlist - user
#updateAntilist - group
#updateWatchlist - group


if __name__ == "__main__":
    app.run(port=5000, debug=True)
