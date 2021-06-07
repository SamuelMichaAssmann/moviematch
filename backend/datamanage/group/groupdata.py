import json


def getAllData(path):
    try:
        with open(path) as file:
            return json.load(file)
    except Exception as e:
        print(e)
        return None


def setData(group, movies, path):
    data = getAllData(path)
    try:  
        if data.get(group) == None:
            data[group] = {}
        for movie in movies:
            data.get(group)[movie] = []
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)


def getData(group, path):
    data = getAllData(path)
    try:  
        if data.get(group) == None:
            data[group] = {}
        return data.get(group)
    except Exception as e:
        print(e)


def setMovie(group, user, movie, path):
    data = getAllData(path)
    print(f"group: {group}, user: {user}, movie: {movie}")
    try:
        if data.get(group) == None:
            data[group] = {}
        if data.get(group).get(movie) == None:
            data.get(group)[movie] =[]
        if user not in data.get(group).get(movie):
            data.get(group).get(movie).append(user)
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)


def getMovie(group, user, path):
    data = getAllData(path)
    try:
        if data.get(group) == None:
            data[group] = {}
            return None
        for k,v in data.get(group).items():
            if user not in v:
                return k
    except Exception as e:
        print(e)
    return None


def check(group, path):
    data = getAllData(path)
    length = 3 # Firebase length of userlist
    movie = False
    try:  
        if data.get(group) == None:
            return False
        for k,v in data.get(group).items():
            if len(v) == length:
                movie = k
                data.get(group).pop(movie)
                # Firebase add match
                break
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)
    return movie


def getLen(group, path):
    return len(getData(group, path))