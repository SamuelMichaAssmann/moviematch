from flask.globals import request
from backend.datamanage.user.usermatch import usermatch
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
def apiusermatch():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    user_id = flask.request.args.get('user_id')
    path = flask.request.args.get('path')
    return usermatch(user_id, path)


@app.route('/api/groupmatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def apigroupmatch():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    user_id = flask.request.args.get('user_id')
    path = flask.request.args.get('path')
    return groupmatch(group_id, user_id, path)


@app.route('/api/userback', methods=['GET', 'OPTIONS'])
@cross_origin()
def userback(): #uid, gid, movieid, kind (like, dislike, neutral), path . watch und antilist vom user
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.userback(flask.request)


@app.route('/api/groupback', methods=['GET', 'OPTIONS'])
@cross_origin()
def groupback():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    user_id = flask.request.args.get('user_id')
    movie_id = flask.request.args.get('movie_id')
    path = flask.request.args.get('path')
    kind = flask.request.args.get('kind')
    setMovie(group_id, user_id, movie_id, path, kind)
    match = matchCheck(group_id, path)
    return match


@app.route('/api/groupcheck', methods=['GET', 'OPTIONS'])
@cross_origin()
def apigroupcheck():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    path = flask.request.args.get('path')
    return matchCheck(group_id, path)


@app.route('/api/groupcheckback', methods=['GET', 'OPTIONS'])
@cross_origin()
def apigroupcheckback():
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
def initializeNewGroup():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.initializeNewGroup(flask.request)


@app.route('/api/getGroupInfo', methods=['GET', 'OPTIONS'])
@cross_origin()
def getGroupInfo():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.getGroupInfo(flask.request.args.get('group_id'))


@app.errorhandler(404)
def page_not_found(e):
    return e, 404


#updateWatchlist - user
@app.route('/api/updateWatchlist', methods=['GET', 'OPTIONS'])
@cross_origin()
def updateWatchlist():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateWatchlist(flask.request)


#updateAntiwatchlist - user
@app.route('/api/updateAntiwatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def updateAntiwatch():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateAntiwatch(flask.request)


#updateAntilist - group
@app.route('/api/updateGroupAnti', methods=['GET', 'OPTIONS'])
@cross_origin()
def updateGroupAnti():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateGroupAnti(flask.request)

#updateWatchlist - group
@app.route('/api/updateGroupWl', methods=['GET', 'OPTIONS'])
@cross_origin()
def updateGroupWl():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateGroupWl(flask.request)

#update matching for groupid
@app.route('/api/updateMatch', methods=['GET', 'OPTIONS'])
@cross_origin()
def updateMatch():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateMatch(flask.request)

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
        data, status = db.updateName(flask.request)
        if status < 200 or status >= 300:
            return { 'message': 'Could not update username' }, 400

    # TODO Update email here

    if 'age' in flask.request.json and flask.request.json['age'] != '':
        data, status = db.updateAge(flask.request)
        if status < 200 or status >= 300:
            return { 'message': 'Could not update age' }, 400

    return {}, 200

# Change a user's name.
@app.route('/api/changeUsername', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_username():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateName(flask.request)

# Change a user's age.
@app.route('/api/changeAge', methods=['POST', 'OPTIONS'])
@cross_origin()
def change_age():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.updateAge(flask.request)

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


@app.route('/api/deleteUser', methods=['POST', 'OPTIONS'])
@cross_origin()
def deleteUser():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    return db.deleteUser(flask.request)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
