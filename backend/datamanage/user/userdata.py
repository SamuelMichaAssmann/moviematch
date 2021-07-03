import json


def getAllData(path):
    try:
        with open(path) as file:
            return json.load(file)
    except Exception as e:
        print(e)
        cleanup(path)
        return None


def cleanup(path):
    print("Error - Cleanup!")
    with open(path, 'w') as file:
            json.dump({}, file)


def setData(user, movies, path):
    data = getAllData(path)
    try:  
        if data.get(user) == None:
            data[user] = []
        for movie in movies:
            if movie not in data.get(user):
                data.get(user).append(movie)
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)


def getData(user, path):
    data = getAllData(path)
    try:
        if data.get(user) == None:
            return []
        return data.get(user)
    except Exception as e:
        print(e)
        return []


def getMovie(user, path):
    data = getAllData(path)
    movie = None
    try:  
        if data.get(user) == None:
            return None
        if data.get(user) == []:
            return None
        movie = data.get(user).pop()
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)
    return movie


def getLen(user, path):
    if getData(user, path) == None:
        return 0
    return len(getData(user, path))