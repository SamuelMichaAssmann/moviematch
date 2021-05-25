import pyrebase
import json
from flask import Flask, request


pb = pyrebase.initialize_app(json.load(open('firebase/fbconfig.json')))
db = pb.database()

'''
create new User /initial user push
@param userid, email
@returns message
'''
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

def setUser(userid,name,email,groups,watchlist,antiwatch,age):
    data = {
        "name" : name,
        "email" : email,
        "groups" : groups,
        "watchlist" : watchlist,
        "antiwatch" : antiwatch,
        "age" : age
    }

    try:
        print("setting user")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully set user")
        return {'message' : "User set"}, 200
    except Exception as e:
        print("\n" + str(e))
        return {'message' : "Error while setting user\n" + str(e)}, 400



'''
updating name to user with localid = userid
@param userid, name
@throws Exception as e
@returns message
'''
def updateName(userid, name):
    data = {
        "name": name
    }
    try:
        print("\nchanging username")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully updated username")

        return {'message': "Username successfully updated"}, 200
    except Exception as e:
        print("\n" + str(e))
        return {'message': "Error while updating username\n" + str(e)}, 400

'''
updating age to user with localid = userid
@param userid, age
@throws Exception as e
@returns message
'''
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
        
'''
updateWL with union of existing wl and newwatchlist, which may contain new movies to user with localid = userid
In order to get the existing movies, 'getWatchlist' is executed
@param userid, newwatchlist
@throws Exception as e
@returns message
'''
def updateWatchlist(userid, newwatchlist):
    oldWL = set(getWatchlist(userid))

    if "initial item" in oldWL:
        data = {
            "watchlist" : list(newwatchlist)
        }
    else:

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


'''
Used to get existing Watchlist of user with localid = userid
@param userid
@returns list(wl)
'''
#returns watchlist as a set
def getWatchlist(userid):

    
    try:
        tempwl = db.child("users").child(userid).child("watchlist").get()
        flag = True
    except:
        flag = False

    wl = set()
    print(tempwl)
    
    if flag == False:
        for x in tempwl.each():
            wl.add(x.val())
    else:
        wl.add("initial item")
        

    return list(wl)


'''
updateAW with union of existing aw and newAntiwatch, which may contain new movies to user with localid = userid
In order to get the existing movies, 'getAntiwatch' is executed
@param userid, newAntiwatch
@throws Exception as e
@returns message
'''
def updateAntiwatch(userid, newAntiwatch):
    oldWL = set(getAntiwatch(userid))

    if "initial item" in oldWL:
        data = {
            "antiwatch" : list(newAntiwatch)
        }
    else:

        data = {
            "antiwatch" : list(oldWL.union(newAntiwatch))
            }

    try:
        print("\nupdating aw")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully updated aw")
        return {'message': "aw successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating aw\n" + str(e)}, 400



'''
Used to get existing Antiwatch of user with localid = userid
@param userid
@returns list(aw)
'''
def getAntiwatch(userid):

    
    try:
        tempaw = db.child("users").child(userid).child("antiwatch").get()
        flag = True
    except:
        flag = False

    aw = set()
    print(tempaw)
    
    if flag == False:
        for x in tempaw.each():
            aw.add(x.val())
    else:
        aw.add("initial item")
        

    return list(aw)


'''
updateGroups with union of existing groups and newGroupList, which may contain new groups to user with localid = userid
In order to get the existing groups, 'getGroupList' is executed
@param userid, newGroupList
@throws Exception as e
@returns message
'''
def updateGroups(userid, newGroupList):
    oldGL = set(getGroupList(userid))

    if "initial item" in oldGL:
        data = {
            "groups" : list(newGroupList)
        }
    else:

        data = {
            "groups" : list(oldGL.union(newGroupList))
            }

    try:
        print("\nupdating gl")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully updated gl")
        return {'message': "gl successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating gl\n" + str(e)}, 400



'''
Used to get existing groups of user with localid = userid
@param userid
@returns list(gl)
'''
def getGroupList(userid):

    
    try:
        tempgl = db.child("users").child(userid).child("groups").get()
        flag = True
    except:
        flag = False

    gl = set()
    print(tempgl)
    
    if flag == False:
        for x in tempgl.each():
            gl.add(x.val())
    else:
        gl.add("initial item")
        

    return list(gl)
