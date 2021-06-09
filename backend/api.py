import flask
import time
import pyrebase
import json
from flask_cors import CORS, cross_origin
from backend.firebase import *
from backend.datamanage.user.usermatch import usermatch
from backend.datamanage.group.groupmatch import groupmatch
from backend.datamanage.group.groupdata import setMovie
from backend.datamanage.group.groupdata import check
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
def userback():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    # firebase add movie to watchlist
    return "Data stored!", 201


@app.route('/api/groupback', methods=['GET', 'OPTIONS'])
@cross_origin()
def groupback():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    user_id = flask.request.args.get('user_id')
    movie_id = flask.request.args.get('movie_id')
    path = flask.request.args.get('path')
    setMovie(group_id, user_id, movie_id, path)
    return "Data stored!", 201


@app.route('/api/groupcheck', methods=['GET', 'OPTIONS'])
@cross_origin()
def apigroupcheck():
    if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
    group_id = flask.request.args.get('group_id')
    path = flask.request.args.get('path')
    return {"result": check(group_id, path)}


# @app.route('/api/setGroupWatchlist', methods=['GET', 'OPTIONS'])
# @cross_origin()
# def set_group_watchlist():
#     if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
#     return {"result": groupMovie("12345", "sJZQk8FH9CU9RBADdXavlssYeP72", "../data/groupmatch.json")}
    #return groupMovie(flask.request.args.get('user_id'), flask.request.args.get('path'), flask.request.args.get('group_id'), flask.request.args.get('movie_id'))


# @app.route('/api/setGroupAntiwatch', methods=['GET', 'OPTIONS'])
# @cross_origin()
# def set_group_antiwatch():
#     if flask.request.method == 'OPTIONS': return _build_cors_preflight_response()
#     return groupMovie(flask.request.args.get('user_id'), flask.request.args.get('path'), flask.request.args.get('group_id'), flask.request.args.get('movie_id'))


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


if __name__ == "__main__":
    app.run(port=5000, debug=True)
