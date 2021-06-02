import json
from os import error
import backend.firebase.firebase_db as db
PATH = '../data/firebase_data.json'


def getFirebase():
    try:
        with open(PATH) as file:
            return json.load(file)
    except (FileNotFoundError):
        return set()


# kind -> {user, group}
def getData(id, kind):
    data = getFirebase()
    try:
        data = data[kind]
        return data[id]
    except (KeyError, TypeError):
        return set()


# data -> {getData()}, kind -> {'name', 'email', 'groups', 'watchlist', 'antiwatch', 'age'}{'name', 'watchlist', 'antiwatch', 'matched', 'members'}
def getList(id, kind, list):
    data = getData(id, kind)
    try:
        return data[list]
    except (KeyError, TypeError):
        return []


# kind -> {'user', 'group'}, list -> {'name', 'email', 'groups', 'watchlist', 'antiwatch', 'age'}{'name', 'watchlist', 'antiwatch', 'matched', 'members'}
def setList(kind, id,  list, input):
    data = getFirebase()
    try:
        data[kind][id][list] = input
        with open(PATH, 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, TypeError):
        return None


# complete user
def setUser(id, name, mail, groups, watchlist, antiwatch, age):
    data = getFirebase()
    try:
        if id in data["users"]:
            return {"error": 404}
        data["users"][id] = {"name": name, 
                             "mail": mail,
                             "groups": groups,
                             "watchlist": watchlist,
                             "antiwatch": antiwatch,
                             "age": age
                             }
        with open(PATH, 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, TypeError):
        return None


# complete  group
def setGroup(id, name, watchlist, antiwatch, matched, members):
    data = getFirebase()
    try:
        if id in data["groups"]:
            return {error: 404}
        data["groups"][id] = {"name": name, 
                             "watchlist": watchlist,
                             "antiwatch": antiwatch,
                             "matched": matched,
                             "members": members
                             }
        with open(PATH, 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, TypeError):
        return None