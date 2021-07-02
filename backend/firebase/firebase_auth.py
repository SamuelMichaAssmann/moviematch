import logging
from os import system
import pprint
import pyrebase
import json
#from firebase_admin import credentials, auth
from flask import Flask, request
import backend.firebase.firebase_db  as db
import requests



pb = pyrebase.initialize_app(json.load(open('firebase/fbconfig.json')))
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
            auth.send_email_verification(user['idToken'])
        except Exception as e:
            print("failed to push User to db\n" + str(e))
            return {
                'message': 'Could not create your account. Please make sure your email is valid.',
                'error' : str(e)
            }, 400

        return {
            'uid' : user['localId'],
            'email' : email,
            'token': user['idToken'],
            'refreshToken': user['refreshToken']
        }, 200
    except Exception as e:
        print("Errormsg: \n" + str(e))
        return {
            'message': 'Could not create your account. Please make sure your email is valid.',
            'error' : str(e)
        }, 400



def sign_in(request):
    email = request.json['email']
    password = request.json['password']

    try:
        user = auth.sign_in_with_email_and_password(
            email,
            password
        )
        userid = user['localId']
        jwt = user['idToken']
        refresh_token = user['refreshToken']

        return {
            'id': userid,
            'token': jwt,
            'refreshToken': refresh_token
        }, 200
    except Exception as e:
        print(str(e))
        return {
            'message': 'Incorrect username or password',
            'error' : str(e)
        }, 400

def updatePwd(request):
    email = request.json['email']

    try:
        auth.send_password_reset_email(email)
        return {}, 200
    except Exception:
        return { 'message' : 'Could not send a password reset email' }, 400

def resend_verification_email(request, allow_refresh=True, new_token='', new_refresh_token=''):
    try:
        user_token = request.json['token'] if new_token == '' else new_token
        auth.send_email_verification(user_token)
        return { 'newToken': new_token, 'newRefreshToken': new_refresh_token }, 200
    except requests.exceptions.HTTPError as e:
        print(e)
        if 'TOO_MANY_ATTEMPTS_TRY_LATER' in repr(e):
            return { 'message': 'Please wait before requesting another verification email' }, 425
        elif 'INVALID_ID_TOKEN' in repr(e) and allow_refresh:
            # If the ID token has expired, refresh it
            try:
                user = auth.refresh(request.json['refreshToken'])
                return resend_verification_email(
                    request,
                    allow_refresh=False,
                    new_token=user['idToken'],
                    new_refresh_token=user['refreshToken']
                )
            except Exception:
                return { 'message': 'Could not send a verification email' }, 400

        return { 'message': 'Could not send a verification email' }, 400


