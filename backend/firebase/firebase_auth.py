import logging
from os import system
import pprint
import pyrebase
import json
from flask import Flask, request
import backend.firebase.firebase_db  as db
import requests



pb = pyrebase.initialize_app(json.load(open('firebase/fbconfig.json')))
auth = pb.auth()

'''
Register a new user.
:param request: Request object containing email and password.
:return: Info + status.
'''
def signup(request):
    email = request.json['email']
    password = request.json['password']

    if (email is None or password is None):
        return {'message': 'Error missing email or password'}, 400

    try:
        user = auth.create_user_with_email_and_password(
            email=email,
            password=password
        )

        try:
            db.push_new_user(user['localId'], user['email'])
            auth.send_email_verification(user['idToken'])
        except Exception:
            return { 'message': 'Could not create your account. Please make sure your email is valid.' }, 400

        return {
            'uid' : user['localId'],
            'email' : email,
            'token': user['idToken'],
            'refreshToken': user['refreshToken']
        }, 200
    except Exception:
        return { 'message': 'Could not create your account. Please make sure your email is valid.' }, 400

'''
Let a user log in.
:param request: Request object containing email and password.
:return: Info + status.
'''
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
    except Exception:
        return { 'message': 'Incorrect username or password' }, 400

'''
Reset a user's password.
:param request: Request object containing email.
:return: Message (or empty dictionary) + status.
'''
def reset_user_password(request):
    email = request.json['email']

    try:
        auth.send_password_reset_email(email)
        return {}, 200
    except Exception:
        return { 'message' : 'Could not send a password reset email' }, 400

'''
Resend a user's verification email.
:param request: Request object containing token and refreshToken.
:param allow_refresh: Whether or not to allow the use of the refresh token.
:param new_token: The new ID token, if any.
:param new_refresh_token: The new refresh token, if any.
'''
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
      
'''
Check if a user has verified their email.
:param request: Request object containing refresh_token.
'''
def is_user_verified(request):
    request_token = request.json['refresh_token']
    user = auth.refresh(request_token)
    if (auth.get_account_info(user['idToken'])['users'][0]['emailVerified']):
        return {'message': 'User is verified'}, 200
    else:
        return {'message': 'User is not verified'}, 401

