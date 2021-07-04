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
pb = pyrebase.initialize_app(json.load(open('./backend/firebase/fbconfig.json')))
auth = pb.auth()

def _build_cors_preflight_response():
    '''
    Handle the preflight for CORS, which allows external sources (e.g. our website) to access the API.
    :return: The new response with proper CORS headers.
    '''
    response = flask.make_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response


@app.route('/api/signup', methods=['POST', 'OPTIONS'])
@cross_origin()
def signup():
    '''
    Handle the creation of a new user.
    Request parameters:
    - email: string
    - password: string
    :return: Info + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.signup(flask.request)


@app.route('/api/signin', methods=['POST', 'OPTIONS'])
@cross_origin()
def sign_in():
    '''
    Handle a user logging in.
    Request parameters:
    - email: string
    - password: string
    :return: Info + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.sign_in(flask.request)


@app.route('/api/resendVerificationEmail', methods=['POST', 'OPTIONS'])
@cross_origin()
def resend_verification_email():
    '''
    Handle resending a verification email to a user.
    Request parameters:
    - token: string
    - refreshToken: string
    :return: Message + status or { newToken, newRefreshToken } + status
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.resend_verification_email(flask.request)


@app.route('/api/resetPwd', methods=['POST', 'OPTIONS'])
@cross_origin()
def reset_password():
    '''
    Handle requesting a password reset email.
    Request parameters:
    - email: string
    :return: Message (or empty dictionary) + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.reset_user_password(flask.request)


@app.route('/api', methods=['GET', 'OPTIONS'])
@cross_origin()
def version():
    '''
    Get the API version number.
    :return: The version as a string.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return 'Api v1.0.0'


@app.route('/api/time', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_current_time():
    '''
    Get the current time (UTC+1).
    :return: The current time.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return {'time': time.time()}


@app.route('/api/usermatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def api_user_match():
    '''
    Attempt to find a movie match (a movie suggestion for a single user).
    Request parameters:
    - user: string.
    - path: string.
    :return: The movie info, or message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    user_id = flask.request.args.get('user_id')
    path = flask.request.args.get('path')
    return user_match(user_id, path)


@app.route('/api/groupmatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def api_group_match():
    '''
    Attempt to find a group match (a movie suggestion for the entire group).
    Request parameters:
    - group: string.
    - user: string.
    - path: string.
    :return: The movie info, or message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    user_id = flask.request.args.get('user_id')
    path = flask.request.args.get('path')
    return group_match(group_id, user_id, path)


@app.route('/api/userback', methods=['POST', 'OPTIONS'])
@cross_origin()
def userback():
    '''
    Update the watch list or anti-watch list of a user.
    Request parameters:
    - user_id: string.
    - movie_id: string.
    - kind: string ('like' or 'dislike').
    :return: { 'movie_id': 'false' }.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    db.userback(flask.request)
    return { 'movie_id': 'false' }


@app.route('/api/groupback', methods=['POST', 'OPTIONS'])
@cross_origin()
def groupback():
    '''
    Update the watch list or anti-watch list of a group for a given user.
    Request parameters:
    - group_id: string.
    - user_id: string.
    - path: string.
    - movie_id: string.
    - kind: string ('like' or 'dislike').
    :return: The movie info.
    '''
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


@app.route('/api/groupList', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_group_list():
    '''
    Retrieve a list of all groups that a given user is in. Each group contains the following properties:
    { id: string, name: string, members: list, owner: string }
    Request parameters:
    - user_id: string.
    :return: The list of groups (or error message) + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.get_user_group_info(flask.request.args.get('user_id'))


@app.route('/api/newGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def initialize_new_group():
    '''
    Create a new group in the database.
    Request parameters:
    - group_name: string.
    - members: list<string>.
    - owner_id: string.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.initialize_new_group(flask.request)


@app.route('/api/getGroupInfo', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_group_info():
    '''
    Retrieve all relevant information from a given group.
    Request parameters:
    - group_id: string.
    :return: Dictionary with group info, or error message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.get_group_info(flask.request.args.get('group_id'))


@app.route('/api/updateWatchlist', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_watch_list():
    '''
    Add movies to a user's watch list (i.e. union of existing watch list and new watch list).
    Request parameters:
    - user_id: string.
    - watchlist: list<string>.
    :return: Message and status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_watch_list(flask.request)


@app.route('/api/updateAntiwatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_antiwatch():
    '''
    Add movies to a user's anti-watch list (i.e. union of existing anti-watch list and new anti-watch list).
    Request parameters:
    - userid: string.
    - newAntiWatch: list<string>.
    :return: Message and status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_antiwatch(flask.request)


@app.route('/api/updateGroupAnti', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_group_antiwatch():
    '''
    Update the anti-watch list of a group.
    Request parameters:
    - groupid: string.
    - newGroupAnti: list<string>.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_group_antiwatch(flask.request)


@app.route('/api/updateGroupWl', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_group_watch_list():
    '''
    Update the watch list of a group.
    Request parameters:
    - groupid: string.
    - newGroupAnti: list<string>.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_group_watch_list(flask.request)


@app.route('/api/updateMatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_group_match():
    '''
    Update a group match (the list of matched movies).
    Request parameters:
    - groupid: string.
    - newGroupAnti: list<string>.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_group_match(flask.request)


@app.route('/api/changeUserData', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_user_data():
    '''
    Change a user's data.
    Request parameters:
    - email: string.
    - password: string.
    - user_id: string.
    - username: string.
    - age: int or string.
    :return: Message + status.
    '''
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


@app.route('/api/changeUsername', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_username():
    '''
    Update the name of a user.
    Request parameters:
    - user_id: string.
    - username: string.
    :return: Message and status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_name(flask.request)


@app.route('/api/changeAge', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_age():
    '''
    Update the age of a user.
    Request parameters:
    - user_id: string.
    - age: int or string.
    :return: Message and status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.update_age(flask.request)


@app.route('/api/resetUserData', methods=['POST', 'OPTIONS'])
@cross_origin()
def reset_user_data():
    '''
    Reset a user's matching and group data
    Request parameters:
    - user_id: string.
    :return: empty dictionary + 200 if successful, dictionary with error message + 400 if unsuccessful.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.reset_user_data(flask.request)


@app.route('/api/joinGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def join_group():
    '''
    Let a user join a group.
    Request parameters:
    - user_id: string.
    - group_id: string.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.join_group(flask.request)


@app.route('/api/leaveGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def leave_group():
    '''
    Let a user leave a group.
    Request parameters:
    - user_id: string.
    - group_id: string.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.leave_group(flask.request)


@app.route('/api/deleteGroup', methods=['POST', 'OPTIONS'])
@cross_origin()
def delete_group():
    '''
    Delete a group from the database.
    Request parameters:
    - user_id: string.
    - group_id: string.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.delete_group(flask.request)


@app.route('/api/deleteUser', methods=['POST', 'OPTIONS'])
@cross_origin()
def delete_user():
    '''
    Delete a user from the database.
    Request parameters:
    - user_id: string.
    :return: Message (or empty dictionary) and status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.delete_user(flask.request)


@app.route('/api/isUserVerified', methods=['POST', 'OPTIONS'])
@cross_origin()
def is_user_verified():
    '''
    Check if a user has verified their email.
    Request parameters:
    - refresh_token: string.
    :return: Message + status.
    '''
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return fb_a.is_user_verified(flask.request)
  

@app.errorhandler(404)
def page_not_found(e):
    return e, 404


if __name__ == '__main__':
    app.run(port=5000, debug=True)
