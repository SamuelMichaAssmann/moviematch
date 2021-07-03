from os import name
import pyrebase
import json
from flask import Flask, request
import uuid
import shortuuid
import requests


pb = pyrebase.initialize_app(json.load(open('firebase/fbconfig.json')))
db = pb.database()

'''
Create a new user.
:param userid: The ID of the user.
:param email: The email address of the user.
:return: Message and status.
'''
def push_new_user(userid, email):
    data = {
        'name': '',
        'email': email,
        'watchlist': '',
        'antiwatch': '',
        'age': ''
    }

    try:
        db.child('users').child(userid).set(data)
        return {'message': 'User successfully written to db'}, 200
    except Exception:
        return {'message': 'Error while writing user to db'}, 400

'''
Set a user's data.
:param userid: The ID of the user to change.
:param name: The new username.
:param email: The new email address.
:param watchlist: The watch list (liked movies).
:param antiwatch: The anti-watch list (disliked movies).
:param age: The user's age.
:return: Message and status.
'''
def set_user(userid, name, email, watchlist, antiwatch, age):
    data = {
        'name': name,
        'email': email,
        'watchlist': watchlist,
        'antiwatch': antiwatch,
        'age': age
    }

    try:
        db.child('users').child(userid).update(data)
        return {'message': 'User set'}, 200
    except Exception:
        return {'message': 'Error while setting user'}, 400

'''
Update the name of a user.
:param request: Request object with parameters user_id and username.
:return: Message and status.
'''
def update_name(request):
    userid = request.json['user_id']
    name = request.json['username']

    data = {
        'name': name
    }

    try:
        db.child('users').child(userid).update(data)
        return {'message': 'Username successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating username'}, 400

'''
Update the age of a user.
:param request: Request object with parameters user_id and age.
:return: Message and status.
'''
def update_age(request):
    userid = request.json['user_id']
    age = request.json['age']

    data = {
        'age': age
    }

    try:
        db.child('users').child(userid).update(data)
        return {'message': 'Age successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating age'}, 400


'''
Add movies to a user's watch list (i.e. union of existing watch list and new watch list).
:param request: Request object with parameters user_id and watchlist.
:return: Message and status.
'''
def update_watch_list(request):
    userid = request.json('user_id')
    new_watch_list = request.json('watchlist')
    
    old_watch_list = set(get_watch_list(userid))

    if old_watch_list == new_watch_list:
        return {'message': 'Identical sets - no new movies watched'}

    if 'initial item' in old_watch_list:
        data = {
            'watchlist': list(new_watch_list)
        }
    else:
        data = {
            'watchlist': list(old_watch_list.union(new_watch_list))
        }

    try:
        db.child('users').child(userid).update(data)
        return {'message': 'Watch list successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating watch list'}, 400

'''
Get the watch list of a given user.
:param userid: The ID of the user.
:return: The watch list.
'''
def get_watch_list(userid):
    wl = set()
    
    try:
        tempwl = db.child('users').child(userid).child('watchlist').get()       
        for x in tempwl.each():
            wl.add(x.val())
    except Exception:
        wl.add('initial item')

    return list(wl)

'''
Add movies to a user's anti-watch list (i.e. union of existing anti-watch list and new anti-watch list).
:param request: Request object with parameters userid and newAntiWatch.
:return: Message and status.
'''
def update_antiwatch(request):
    userid = request.json('userid')
    new_anti_watch = request.json('newAntiwatch')

    old_watch_list = set(get_antiwatch(userid))

    if old_watch_list == new_anti_watch:
        print('No new movies added to Antiwatch')
        return {'message' : 'Identical sets - no new movies added to Antiwatch'}

    if 'initial item' in old_watch_list:
        data = {
            'antiwatch': list(new_anti_watch)
        }
    else:

        data = {
            'antiwatch': list(old_watch_list.union(new_anti_watch))
        }

    try:
        db.child('users').child(userid).update(data)
        return {'message': 'aw successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating aw'}, 400

'''
Get the anti-watch list of a given user.
:param userid: The ID of the user.
:return: The anti-watch list.
'''
def get_antiwatch(userid):
    aw = set()
    
    try:
        tempaw = db.child('users').child(userid).child('antiwatch').get()       
        for x in tempaw.each():
            aw.add(x.val())
    except Exception:
        aw.add('initial item')

    return list(aw)

'''
Reset a user's matching and group data
:param request: Should contain user_id
:return: empty dictionary + 200 if successful, dictionary with error message + 400 if unsuccessful
'''
def reset_user_data(request):
    userid = request.json['user_id']

    try:
        data = {
            'watchlist': '',
            'antiwatch': ''
        }

        db.child('users').child(userid).update(data)

        for group in db.child('groups').get().each():
            request.json['group_id'] = group.key()
            remove_user_from_group(group, request)

        return {}, 200
    except Exception as e:
        print(e)
        return { 'message': 'User data could not be reset' }, 400


'''
Delete a user from the database.
:param request: Request object containing user_id.
:return: Message (or empty dictionary) and status.
'''
def delete_user(request):
    userid = request.json['user_id']
    
    try:
        for group in db.child('groups').get().each():
            request.json['group_id'] = group.key()
            remove_user_from_group(group, request)
            db.child('users').child(userid).remove()
            
        return {}, 200
    except Exception as e:
        print(e)
        return { 'message': 'User could not be deleted' }, 400

'''
Remove a given user from a given group.
:param group: The group database object.
:param request: Request object containing user_id.
'''
def remove_user_from_group(group, request):
    userid = request.json['user_id']

    # If this user owns the group, delete the group.
    _, status = delete_group(request)
    if status == 200:
        return

    # Remove the user from the group.
    members = group.val()['members']
    if userid not in members: return
    members.remove(userid)

    # If there are somehow no more users in this group, delete the group.
    if len(members) == 0:
        delete_group(request, force=True)
        return

    # Update group info.
    data = { 'members': members }
    db.child('groups').child(group.key()).update(data)


'''
Retrieve a list of all groups that a given user is in. Each group contains the following properties:
{ id: string, name: string, members: list, owner: string }
:param userid: The ID of the user.
:return: The list of groups (or error message) + status.
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
    except Exception:
        return { 'message': 'Could not get group list' }, 400

'''
Retrieve all relevant information from a given group.
:param groupid: The ID of the group.
:return: Dictionary with group info, or error message + status.
'''
def get_group_info(groupid):
    gi = {}

    try:
        tempgi = db.child('groups').child(groupid).get()
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
        
        return gi
    except Exception:
        return { 'message': 'GroupId does not exist' }, 400

'''
Create a new group in the database.
:param request: Request object containing group_name, members and owner_id.
:return: Message + status.
'''
def initialize_new_group(request):
    name = request.json['group_name']
    members = request.json['members']
    owner = request.json['owner_id']

    groupid = shortuuid.ShortUUID().random(length=10)

    if (check_group_exists(groupid)):
        try:
            watchlist = set()
            antiwatch = set()
            for m in members:
                try: 
                    watchlist = watchlist.union(set(get_watch_list(m)))
                    antiwatch = antiwatch.union(set(get_antiwatch(m)))
                except Exception as e:
                    print(str(e))

            if ('initial item' in watchlist):
                watchlist.remove('initial item')
                
            if ('initial item' in antiwatch):
                antiwatch.remove('initial item')

            temp_inter = watchlist.intersection(antiwatch)
            watchlist.difference_update(temp_inter)
            antiwatch.difference_update(temp_inter)

            if (antiwatch == set()):
                antiwatch = ''
            else:
                antiwatch = list(antiwatch)

            if (watchlist == set()):
                watchlist = ''
            else:
                watchlist = list(watchlist)
                
            data = {
                'name': name,
                'members': members,
                'owner': owner,
                'watchlist': watchlist,
                'antiwatch': antiwatch,
                'matched': ''
            }

            db.child('groups').child(groupid).set(data)
            return { 'success': True }, 200
        except Exception:
            return { 'message' : 'Error while creating Group' }, 400
    else:
        return { 'message' : 'Group already exists - please choose another name' }, 400

'''
Check if a group exists.
:param group_id: The ID of the group.
:return: True if the group exists, False otherwise.
'''
def check_group_exists(group_id):
    try:
        data = db.child('groups').child(group_id).get()
        if (data.val() == None):
            return True
        else:
            return False
    except Exception:
        return False

'''
Remove all movies that are present in both the watch list and the anti-watch list of a given group.
:param groupid: The ID of the group.
:return: The new watch list and anti-watch list.
'''
def remove_watchlist_antiwatch_duplicates(groupid):
    members = db.child('groups').child(groupid).child('members').get().val()
    
    watchlist = set()
    antiwatch = set()

    for m in members:
        try:
            print('get watchlist from ' + m)
            watchlist = watchlist.union(set(get_watch_list(m)))
            antiwatch = antiwatch.union(set(get_antiwatch(m)))
        except Exception as e:
            print(str(e))

    temp_inter = watchlist.intersection(antiwatch)
    watchlist.difference_update(temp_inter)
    antiwatch.difference_update(temp_inter)

    data = {
        'watchlist' : list(watchlist),
        'antiwatch' : list(antiwatch)
    }

    db.child('groups').child(groupid).update(data)
    return data

'''
Update the anti-watch list of a group.
:param request: Request object containing groupid and newGroupAnti.
:return: Message + status.
'''
def update_group_antiwatch(request):
    groupid = request.json('groupid')
    new_group_antiwatch = request.json('newGroupAnti')

    old_antiwatch = set(remove_watchlist_antiwatch_duplicates(groupid)['antiwatch'])
    if old_antiwatch == new_group_antiwatch:
        print('No new Antiwatch added') 
        return {'message' : 'Identical sets - no new aw added'}


    if 'initial item' in old_antiwatch:
        data = {
            'antiwatch': list(new_group_antiwatch)
        }
    else:

        data = {
            'antiwatch': list(old_antiwatch.union(new_group_antiwatch))
        }

    try:
        db.child('groups').child(groupid).update(data)
        return {'message': 'Group antiwatch successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating group antiwatch'}, 400

'''
Update the watch list of a group.
:param request: Request object containing groupid and newGroupAnti.
:return: Message + status.
'''
def update_group_watch_list(request):
    groupid = request.json('groupid')
    new_group_watchlist = request.json('newGroupAnti')

    old_watch_list = set(remove_watchlist_antiwatch_duplicates(groupid)['watchlist'])
    if old_watch_list == new_group_watchlist:
        print('No new watchlist added') 
        return {'message' : 'Identical sets - no new wl added'}


    if 'initial item' in old_watch_list:
        data = {
            'watchlist': list(new_group_watchlist)
        }
    else:

        data = {
            'watchlist': list(old_watch_list.union(new_group_watchlist))
        }

    try:
        db.child('groups').child(groupid).update(data)
        return {'message': 'Group watch list successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating group watch list'}, 400

'''
Get a list of all matched movies in a group.
:param groupid: The ID of the group.
:return: The list of matched movies.
'''
def get_matched(groupid):
    ml = set()
    
    try:
        tempgl = db.child('groups').child(groupid).child('matching').get()       
        for x in tempgl.each():
            ml.add(x.val())
    except Exception:
         ml.add('initial item')

    return list(ml)

'''
Update a group match (the list of matched movies).
:param request: Request object containing groupid and newGroupAnti.
:reutrn: Message + status.
'''
def update_group_match(request):
    groupid = request.json('groupid')
    new_match_list = request.json('newGroupAnti')

    old_match_list = set(get_matched(groupid))
    if old_match_list == new_match_list:
        print('No new matches added') 
        return {'message' : 'Identical sets - no new matches added'}


    if 'initial item' in old_match_list:
        data = {
            'matched': list(new_match_list)
        }
    else:

        data = {
            'matched': list(old_match_list.union(new_match_list))
        }

    try:
        db.child('groups').child(groupid).update(data)
        return {'message': 'Group match list successfully updated'}, 200
    except Exception:
        return {'message': 'Error while updating group match list'}, 400

'''
Let a user join a group.
:param request: Request object containing user_id and group_id.
:return: Message + status.
'''
def join_group(request):
    userid, groupid = '', ''

    if 'user_id' in request.json and 'group_id' in request.json:
        userid = request.json['user_id']
        groupid = request.json['group_id']
    else:
        return { 'message': 'Please provide user_id and group_id parameters' }, 400

    try:
        members = db.child('groups').child(groupid).child('members').get().val()
        if userid in members:
            return { 'message': 'You are already a member of this group' }, 400

        members.append(userid)

        data = {
            'members' : members
        }

        db.child('groups').child(groupid).update(data)
        return {}, 200
    except requests.exceptions.HTTPError:
        return { 'message': 'This group does not exist' }, 400

'''
Let a user leave a group.
:param request: Request object containing user_id and group_id.
:return: Message + status.
'''
def leave_group(request):
    userid = request.json['user_id']
    groupid = request.json['group_id']

    members = db.child('groups').child(groupid).child('members').get().val()
    members.remove(userid)

    data = {
        'members' : members
    }

    db.child('groups').child(groupid).update(data)

'''
Delete a group from the database.
:param request: Request object containing user_id and group_od.
:param force: Set to True if the group should be deleted even if the user does not own the group.
:return: Message + status.
'''
def delete_group(request, force=False):
    userid = request.json['user_id']
    groupid = request.json['group_id']

    owner = db.child('groups').child(groupid).child('owner').get().val()
    if userid != owner and not force:
        return { 'message': 'User does not own group' }, 400

    groups = db.child('groups').get().val()
    del groups[groupid]

    data = {
        'groups': groups
    }

    db.update(data)
    return { 'message': 'Group successfully deleted' }, 200

'''
Update the watch list or anti-watch list of a user.
:param request: Request object containing user_id, movie_id and kind ('like' or 'dislike').
'''
def userback(request):
    try:
        uid = request.args.get('user_id')
        temp = request.args.get('movie_id')
        movie_id = int(temp)
        kind = request.args.get('kind')

        if (kind == 'like'):
            data = {
                'userid' : uid,
                'newwatchlist' : [movie_id]
            }
            updateWatchlistTest(uid, [movie_id]) #TODO update
            return {'message' : 'Succesfully wrote movie to db'}, 200

        if (kind == 'dislike'):
            data = {
                'userid' : uid,
                'newAntiwatch' : [movie_id]
            }
            updateAntiwatchTest(uid, [movie_id]) #TODO update
            return {'message' : 'Succesfully wrote movie to db'}, 200
    except Exception:
        return { 'message': 'Could not update watch list or anti-watch list' }, 400



