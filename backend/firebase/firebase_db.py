from os import name
import pyrebase
import json
from flask import Flask, request
import uuid
import shortuuid


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
        print("writing user/ writing user data to db")
        db.child("users").child(userid).set(data)
        print("successfully wrote user-data to db")
        return {'message': "User successfully written to db"}, 200
    except Exception as e:
        print("\n" + str(e))
        return {'message': "Error while writing user to db\n" + str(e)}, 400


def setUser(userid, name, email, groups, watchlist, antiwatch, age):
    data = {
        "name": name,
        "email": email,
        "groups": groups,
        "watchlist": watchlist,
        "antiwatch": antiwatch,
        "age": age
    }

    try:
        print("setting user")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully set user")
        return {'message': "User set"}, 200
    except Exception as e:
        print("\n" + str(e))
        return {'message': "Error while setting user\n" + str(e)}, 400


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


def updateWatchlist(request):
    userid = request.json('user_id')
    newwatchlist = request.json('watchlist')
    
    oldWL = set(getWatchlist(userid))

    if oldWL == newwatchlist:
        print("No new movies watched")
        return {'message' : 'Identical sets - no new movies watched'}

    if "initial item" in oldWL:
        data = {
            "watchlist": list(newwatchlist)
        }
    else:

        data = {
            "watchlist": list(oldWL.union(newwatchlist))
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
# returns watchlist as a list


def getWatchlist(userid):
    wl = set()
    
    try:
        tempwl = db.child("users").child(userid).child("watchlist").get()       
        for x in tempwl.each():
            wl.add(x.val())
    except:
        wl.add("initial item")
    return list(wl)



'''
updateAW with union of existing aw and newAntiwatch, which may contain new movies to user with localid = userid
In order to get the existing movies, 'getAntiwatch' is executed
@param userid, newAntiwatch
@throws Exception as e
@returns message
'''


def updateAntiwatch(request):
    userid = request.json('userid')
    newAntiwatch = request.json('newAntiwatch')

    oldWL = set(getAntiwatch(userid))

    if oldWL == newAntiwatch:
        print("No new movies added to Antiwatch")
        return {'message' : 'Identical sets - no new movies added to Antiwatch'}

    if "initial item" in oldWL:
        data = {
            "antiwatch": list(newAntiwatch)
        }
    else:

        data = {
            "antiwatch": list(oldWL.union(newAntiwatch))
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

    aw = set()
    
    try:
        tempaw = db.child("users").child(userid).child("antiwatch").get()       
        for x in tempaw.each():
            aw.add(x.val())
    except:
        aw.add("initial item")
    return list(aw)





'''
Returns a list of all groups that a given user is in. Each group contains the following properties:
{ id: string, name: string, members: list, owner: string }
@param userid
@returns the list of groups
'''
def get_user_group_info(userid):
    try:
        groups = [
            {
                'id': group.key(),
                'name': group.val()['name'],
                'members': [
                    user.val()['name']
                        for user in db.child('users').get().each()
                        for member in group.val()['members']
                        if user.key() == member
                ],
                'owner': group.val()['owner'] 
            }
                for group in db.child('groups').get().each()
                if userid in group.val()['members']
        ]

        return { 'groups': groups }, 200
    except Exception as e:
        print('Could not get group list\n' + 'Error : ' + str(e))
        return {
            'message' : 'Could not get group list',
            'errorMsg' : str(e)
        }, 400


'''
Used to get existing groups of user with localid = userid
@param userid
@returns list(gl)
'''
def getGroupList(userid):
    gl = set()
    
    try:
        tempgl = db.child("users").child(userid).child("groups").get()       
        for x in tempgl.each():
            gl.add(x.val())
    except:
         gl.add("initial item")
    return list(gl)

'''
updateGroups with union of existing groups and newGroupList, which may contain new groups to user with localid = userid
In order to get the existing groups, 'getGroupList' is executed
@param userid, newGroupList
@throws Exception as e
@returns message
'''


def updateGroups(userid, newGroupList):

    oldGL = set(getGroupList(userid))
    if oldGL == newGroupList:
        print("No new groups") 
        return {'message' : 'Identical sets - no new groups entered'}


    if "initial item" in oldGL:
        data = {
            "groups": list(newGroupList)
        }
    else:

        data = {
            "groups": list(oldGL.union(newGroupList))
        }

    try:
        print("\nupdating gl")
        db.child("users").child(userid).update(data)
        print("\nSuccessfully updated gl")
        return {'message': "gl successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating gl\n" + str(e)}, 400

def getGroupInfo(groupid):
    gi = {}

    try:
        tempgi = db.child("groups").child(groupid).get()
        for x in tempgi.each():
            gi[x.key()] = x.val()
        gi['members'] = [
            {
                'name': user.val()['name'],
                'owner': (user.key() == gi['owner'])
            }
                for user in db.child('users').get().each()
                for member in gi['members']
                if user.key() == member
        ]        
        print(gi)
        return gi
    except Exception as e:
        print("Group does not exist\n" + "Error : " + str(e))
        return {
            'message' : "GroupId does not exist",
            'errorMsg' : str(e)
        }, 400

def initializeNewGroup(request):
    name = request.json['group_name']
    members = request.json['members']
    owner = request.json['owner_id']

    groupid = shortuuid.ShortUUID().random(length=10)

    if (checkGroupExist(groupid)):
        print("Does not Exist")
        try:
            watchlist = set()
            antiwatch = set()
            for m in members:
                
                try: 
                    print("get watchlist from " + m)
                    watchlist = watchlist.union(set(getWatchlist(m)))
                    antiwatch = antiwatch.union(set(getAntiwatch(m)))
                except Exception as e:
                    print(str(e))

            if ("initial item" in watchlist):
                print("removed i.i from wl")
                watchlist.remove("initial item")
                print("success")
                
            if ("initial item" in antiwatch):
                print("removed i.i from al")
                antiwatch.remove("initial item")
                print("success")

            temp_inter = watchlist.intersection(antiwatch)
            watchlist.difference_update(temp_inter)
            antiwatch.difference_update(temp_inter)

            if (antiwatch == set()):
                antiwatch = ""
            else:
                antiwatch = list(antiwatch)
            if (watchlist == set()):
                watchlist = ""
            else:
                watchlist = list(watchlist)
                


            data = {
                "name" : name,
                "members" : members,
                "owner" : owner,
                "watchlist" : watchlist,
                "antiwatch" : antiwatch,
                "matched" : ""
            }

            print("creating group")
            db.child("groups").child(groupid).set(data)
            print("Group created")

            for m in members:
                try:
                    print("update group for member: " + m)
                    updateGroups(m,[groupid])
                    print("updated for " + m)
                except Exception as e:
                    return {
                        'message' : "Error while inserting Group for each member",
                        'error' : str(e)
                    }, 400
            print("\n\nsuccessfully updated all members")

            return { 'success': True }, 200
        except Exception as e:
            print("Error while creating Group. \n" + "Error : " + str(e))
            return {
                'message' : "Error while creating Group",
                'error' : str(e)
            }, 400
    else:
        print("Group does exist already")
        return {
            'message' : "Group already exists - pls choose another name"
        }, 400

        # watchlist und antiwatch der gruppe initialize
        # wenn watch und anti - aus beiden löschen

def checkGroupExist(name):
    try:
        data = db.child("groups").child(name).get()
        if (data.val() == None):
            return True
        else: return False
    except:
        return False

'''
name
members
owner
'''

def fetchAWandGL_Groups(groupid):
    members = db.child("groups").child(groupid).child("members").get().val()
    
    watchlist = set()
    antiwatch = set()

    for m in members:
        try:
            print("get watchlist from " + m)
            watchlist = watchlist.union(set(getWatchlist(m)))
            antiwatch = antiwatch.union(set(getAntiwatch(m)))
        except Exception as e:
            print(str(e))

    if ("initial item" in watchlist):
                print("removed i.i from wl")
                watchlist.remove("initial item")
                print("success")
                
    if ("initial item" in antiwatch):
                print("removed i.i from al")
                antiwatch.remove("initial item")
                print("success")

    temp_inter = watchlist.intersection(antiwatch)
    watchlist.difference_update(temp_inter)
    antiwatch.difference_update(temp_inter)

    if (antiwatch == set()):
        antiwatch = ""
    else:
        antiwatch = list(antiwatch)
    if (watchlist == set()):
        watchlist = ""
    else:
        watchlist = list(watchlist)
        
    data = {
        
        "watchlist" : watchlist,
        "antiwatch" : antiwatch,
        
    }

    return data










def updateGroupAnti(request):
    groupid = request.json('groupid')
    newGroupAnti = request.json('newGroupAnti')

    oldAW = set(fetchAWandGL_Groups(groupid)['antiwatch'])
    if oldAW == newGroupAnti:
        print("No new Antiwatch added") 
        return {'message' : 'Identical sets - no new aw added'}


    if "initial item" in oldAW:
        data = {
            "antiwatch": list(newGroupAnti)
        }
    else:

        data = {
            "antiwatch": list(oldAW.union(newGroupAnti))
        }

    try:
        print("\nupdating g_aw")
        db.child("groups").child(groupid).update(data)
        print("\nSuccessfully updated g_aw")
        return {'message': "g_aw successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating g_aw\n" + str(e)}, 400


def updateGroupWl(request):
    groupid = request.json('groupid')
    newGroupWl = request.json('newGroupAnti')

    oldWL = set(fetchAWandGL_Groups(groupid)['watchlist'])
    if oldWL == newGroupWl:
        print("No new watchlist added") 
        return {'message' : 'Identical sets - no new wl added'}


    if "initial item" in oldWL:
        data = {
            "watchlist": list(newGroupWl)
        }
    else:

        data = {
            "watchlist": list(oldWL.union(newGroupWl))
        }

    try:
        print("\nupdating g_wl")
        db.child("groups").child(groupid).update(data)
        print("\nSuccessfully updated g_wl")
        return {'message': "g_wl successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating g_wl \n" + str(e)}, 400


def getMatched(groupid):
    ml = set()
    
    try:
        tempgl = db.child("groups").child(groupid).child("matching").get()       
        for x in tempgl.each():
            ml.add(x.val())
    except:
         ml.add("initial item")
    return list(ml)

def updateMatch(request):
    groupid = request.json('groupid')
    newMatchList = request.json('newGroupAnti')

    oldML = set(getMatched(groupid))
    if oldML == newMatchList:
        print("No new matches added") 
        return {'message' : 'Identical sets - no new matches added'}


    if "initial item" in oldML:
        data = {
            "matched": list(newMatchList)
        }
    else:

        data = {
            "matched": list(oldML.union(newMatchList))
        }

    try:
        print("\nupdating g_ml")
        db.child("groups").child(groupid).update(data)
        print("\nSuccessfully updated g_ml")
        return {'message': "g_ml successfully updated"}, 200
    except Exception as e:
        print("Error:\n " + str(e))
        return {'message': "Error while updating g_ml \n" + str(e)}, 400


def exitGroup(userid, groupid):
    members = db.child("groups").child(groupid).child("members").get().val()
    members.remove(userid)

    data = {
        "members" : members
    }

    db.child("groups").child(groupid).update(data)
    deleteGroup(userid, groupid)

def deleteGroup(userid, groupid):

    groups = db.child("users").child(userid).child("groups").get().val()
    if(groups.remove(groupid) == None ):
        data = {
            "groups" : groups
        }
    else: 
        data = {
            "groups" : groups.remove(groupid)
        }
    db.child("users").child(userid).update(data)



#def updateLists()