import json


def getAllData(path):
    try:
        with open(path) as file:
            return json.load(file)
    except (FileNotFoundError, KeyError):
        return []


def getData(user, path):
    try:
        with open(path) as file:
            return json.load(file)[user]
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
