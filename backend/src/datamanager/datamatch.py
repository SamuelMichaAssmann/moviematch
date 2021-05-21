import json
import threading


def getPath(id):
    if id:
        return '../data/usermatch.json'
    else:
        return '../data/groupmatch.json' 


def getData(user, path):
    try:
        with open(getPath(path)) as file:
            return json.load(file)[user]
    except (FileNotFoundError, KeyError):
        return []


def getAllData(path):
    try:
        with open(getPath(path)) as file:
            return json.load(file)
    except (FileNotFoundError, KeyError):
        return []


def setData(user, userdata, path):
    data = getAllData(path)
    try:  
        if getData(user, path) == []:
            data[user] = userdata
        data[user] = list(set(data[user] + userdata))
        with open(getPath(path), 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, TypeError):
        pass


def popMovie(user, path):
    data = getAllData(path)
    try:
        movie = data[user].pop()
        print(movie)
        if len(data[user]) < 20:
            threading.Thread(target=generate).start()
        with open(getPath(path), 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, IndexError, TypeError):
        return None
    return movie


def generate():
    print("KI ACTIVATE")
