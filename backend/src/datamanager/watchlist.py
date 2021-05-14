import json
PATH = '../data/firebase_data.json'

def getData():
    try:
        with open(PATH) as file:
            return json.load(file)
    except (FileNotFoundError):
        return set()

def getUsers():
    data = getData()
    try:
        return data["users"]
    except (KeyError, TypeError):
        return set()


def getGroup():
    data = getData()
    try:
        return data["groups"]
    except (KeyError, TypeError):
        return set()


def getUserdata(user):
    data = getUsers()
    try:
        return data[user]
    except (KeyError, TypeError):
        return set()


def getWatchlist(userdata):
    try:
        return userdata['watchlist']
    except (KeyError, TypeError):
        return []


def getAntiwatch(userdata):
    try:
        return userdata['antiwatch']
    except (KeyError, TypeError):
        return []


def setData(user, userdata):
    data = getData()
    try:  
        data[user] = userdata
        with open(PATH, 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, TypeError):
        pass


print(getData())
print(getUserdata('12345'))
print(getWatchlist(getUserdata('12345')))