from flask.globals import request
from backend.datamanage.user.usermatch import user_match
import flask
import time
import pyrebase
import json
from flask_cors import CORS, cross_origin
from backend.firebase import *
from backend.datamanage.group.groupmatch import *
from backend.datamanage.group.groupdata import *
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
def sign_in():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.sign_in(flask.request)

@app.route('/api/resendVerificationEmail', methods=['POST', 'OPTIONS'])
@cross_origin()
def resend_verification_email():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.resend_verification_email(flask.request)

@app.route('/api/resetPwd', methods=['POST', 'OPTIONS'])
@cross_origin()
def reset_password():
     if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
     return fb_a.reset_user_password(flask.request)

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
def api_user_match():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    user_id = flask.request.args.get('user_id')
    path = flask.request.args.get('path')
    return user_match(user_id, path)

@app.route('/api/groupmatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def api_group_match():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    user_id = flask.request.args.get('user_id')
    path = flask.request.args.get('path')
    return group_match(group_id, user_id, path)


@app.route('/api/userback', methods=['POST', 'OPTIONS'])
@cross_origin()
def userback(): # uid, gid, movieid, kind (like, dislike, neutral), path to watch and antiwatch-list from user
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    db.userback(flask.request)
    return {"movie_id": "false"}

@app.route('/api/groupback', methods=['POST', 'OPTIONS'])
@cross_origin()
def groupback():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    print(flask.request.json)
    group_id = flask.request.json['group_id']
    user_id = flask.request.json['user_id']
    movie_id = flask.request.json['movie_id']
    path = flask.request.json['path']
    kind = flask.request.json['kind']
    set_movie(group_id, user_id, movie_id, path, kind)
    match = match_check(group_id, user_id, path)
    return match

@app.route('/api/groupcheck', methods=['GET', 'OPTIONS'])
@cross_origin()
def api_group_check():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    path = flask.request.args.get('path')
    return match_check(group_id, path)

@app.route('/api/groupcheckback', methods=['GET', 'OPTIONS'])
@cross_origin()
def api_group_check_back():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    path = flask.request.args.get('path')
    return {}

@app.route('/api/groupList', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_group_list():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.get_user_group_info(flask.request.args.get('user_id'))

@app.route('/api/newGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def initialize_new_group():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.initialize_new_group(flask.request)

@app.route('/api/getGroupInfo', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_group_info():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.get_group_info(flask.request.args.get('group_id'))

@app.route('/api/updateWatchlist', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_watch_list():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_watch_list(flask.request)

@app.route('/api/updateAntiwatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_antiwatch():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_antiwatch(flask.request)

@app.route('/api/updateGroupAnti', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_group_antiwatch():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_group_antiwatch(flask.request)

@app.route('/api/updateGroupWl', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_group_watch_list():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_group_watch_list(flask.request)

@app.route('/api/updateMatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_group_match():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_group_match(flask.request)

# Change a user's data.
# Pass the following arguments: email, password, user_id, username, age
@app.route('/api/changeUserData', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_user_data():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()

    data, status = fb_a.sign_in(flask.request)
    if status < 200 or status >= 300:
        return { 'message': 'Incorrect password' }, 401

    if 'username' in flask.request.json and flask.request.json['username'] != '':
        data, status = db.update_name(flask.request)
        if status < 200 or status >= 300:
            return { 'message': 'Could not update username' }, 400

    if 'age' in flask.request.json and flask.request.json['age'] != '':
        data, status = db.update_age(flask.request)
        if status < 200 or status >= 300:
            return { 'message': 'Could not update age' }, 400

    return {}, 200

# Change a user's name.
@app.route('/api/changeUsername', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_username():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_name(flask.request)

# Change a user's age.
@app.route('/api/changeAge', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_age():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_age(flask.request)

# Reset a user's matching and group data.
@app.route('/api/resetUserData', methods=['POST', 'OPTIONS'])
@cross_origin()
def reset_user_data():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.reset_user_data(flask.request)

# Join a group.
@app.route('/api/joinGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def join_group():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.join_group(flask.request)

# Leave a group.
@app.route('/api/leaveGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def leave_group():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.leave_group(flask.request)

# Delete a group.
@app.route('/api/deleteGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def delete_group():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.delete_group(flask.request)

#Delete a user
@app.route('/api/deleteUser', methods=['POST', 'OPTIONS'])
@cross_origin()
def delete_user():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.delete_user(flask.request)

#Check if user is verified
@app.route('/api/isUserVerified', methods=['POST', 'OPTIONS'])
@cross_origin()
def is_user_verified():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.is_user_verified(flask.request)
  
@app.errorhandler(404)
def page_not_found(e):
    return e, 404


if __name__ == '__main__':
    app.run(port=5000, debug=True)
