from logging import exception
from os import kill
import pyrebase
import json
import pprint

fbconfig = {
    "apiKey": "AIzaSyBRgRRFUlg9XJ6ZrdWxYaoOB5VvQXDaBko",
    "authDomain": "moviematch-c1175.firebaseapp.com",
    "databaseURL": "https://moviematch-c1175-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "moviematch-c1175",
    "storageBucket": "moviematch-c1175.appspot.com",
    "messagingSenderId": "199143205697",
    "appId": "1:199143205697:web:2dbe6c53b964b156ef4fc0",
    "measurementId": "G-8BC59JDXPZ"
  }

pb = pyrebase.initialize_app(fbconfig)
auth = pb.auth()
db = pb.database()


testmail = input("Please input email")
testpasswort = input("Please input pwd")

def createUser(email, password):
  try:
          print("trying")
          user = auth.create_user_with_email_and_password(
              email,
              password
          )
          pprint.pprint(user)
          print( {'message': f'Successfully created user {user.uid}'}, 201)
  except Exception as e:
          print( {'message': 'Error creating user'}, 400)
          print("\n" + str(e))

def updateName(userid, name):
    data = {
        "name" : name
    }
    try:
        print("changing username")
        db.child("users").child(userid).child("name").update(data)
        print("Successfully created user in db")

        print("writing user/ writing user data to db")
        db.child("users").child(userid).set(data)
        print("successfully wrote user-data to db")
        return {'message': "User successfully written to db"} ,200
    except Exception as e:
        print("\n" + str(e))
        return {'message': "Error while writing user to db\n" + str(e) }, 400



updateName("njeWiwwulKNoP7xQ9vhNUIB0xKB2", "Moritz")