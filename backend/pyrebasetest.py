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
age = input("Age")

def pushNewUser(userid, email):
    data = {
        "name": "",
        "email": email,
        "groups": "",
        "watchlist": "",
        "antiwatch": "",
        "age": ""
    }

    try:
        print("writing user/ creating user in db")
        db.child("users").set(userid)
        print("Successfully created user in db")

        print("writing user/ writing user data to db")
        db.child("users").child(userid).set(data)
        print("successfully wrote user-data to db")
        return {'message': "User successfully written to db"}, 200
    except Exception as e:
        print("\n" + str(e))
        return {'message': "Error while writing user to db\n" + str(e)}, 400

def updateAge(userid, age):
    data = {
        "age": age
    }

    try:
        print("\nupdating age")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully updated user-age")
        return {'message': "User-Age successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating User-Age\n" + str(e)}, 400        

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



def updateWatchlist(userid, newwatchlist):
    oldWL = getWatchlist(userid)

    data = {
        "watchlist" : list(oldWL.union(newwatchlist))
        }

    try:
        print("\nupdating wl")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully updated wl")
        return {'message': "wl successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating wl\n" + str(e)}, 400



def getWatchlist(userid):
    wl = db.child("users").child(userid).child("watchlist").get()
    returnWL = set()
    
    for x in wl.each():
       returnWL.add(x.val())
    
    print("\n")

    return returnWL

newWl = {"Joker", "Test", "Inception"}

updateWatchlist("5KLEFKGKojeGsskzUCbQQN507Rs1", newWl)
updateName("5KLEFKGKojeGsskzUCbQQN507Rs1","Lukas Becker")
updateAge("5KLEFKGKojeGsskzUCbQQN507Rs1", 20)




