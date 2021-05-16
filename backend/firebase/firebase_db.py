import pyrebase
import json
from flask import Flask, request




pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))
db = pb.database()

def pushNewUser(userid, email):
    data = {
        "name" : None ,
        "email" : email,
        "groups" : [],
        "watchlist" : [],
        "antiwatch" : [],
        "age" : None
    }

    try: 
        print("writing user/ creating user in db")
        db.child("users").set(userid)
        print("Successfully created user in db")

        print("writing user/ writing user data to db")
        db.child("users").child(userid).set(data)
        print("successfully wrote user-data to db")
        return {'message': "User successfully written to db"} ,200
    except Exception as e:
        print("\n" + str(e))
        return {'message': "Error while writing user to db\n" + str(e) }, 400
    
    
