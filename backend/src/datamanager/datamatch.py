import json
import threading


def getData(user, path):
    try:
        with open(path) as file:
            return json.load(file)[user]
    except (FileNotFoundError, KeyError):
        return []


def getAllData(path):
    try:
        with open(path) as file:
            return json.load(file)
    except (FileNotFoundError, KeyError):
        return []


def setData(user, userdata, path):
    data = getAllData(path)
    try:  
        if getData(user, path) == []:
            data[user] = userdata
        data[user] = list(set(data[user] + userdata))
        with open(path, 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, TypeError):
        pass



def popMovie(user, path):
    data = getAllData(path)
    try:
        movie = data[user].pop()
        if len(data[user]) < 20:
            threading.Thread(target=generate(user)).start()
        with open(path, 'w') as file:
            json.dump(data, file)
    except (FileNotFoundError, KeyError, IndexError, TypeError):
        return None
    return movie


def generate(user):
    print(f"KI ACTIVATE for {user}")
