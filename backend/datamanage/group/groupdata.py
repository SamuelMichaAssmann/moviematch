import json

from scipy.sparse import data


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


def getDataList(group, path):
    data = getAllData(path)
    try:
        if data.get(group) == None:
            return []
        return data.get(group).keys()
    except Exception as e:
        print(e)


def setMovie(group, user, movie, path, kind):
    data = getAllData(path)
    try:
        if kind == 'like':
            if data.get(group) == None:
                data[group] = {}
                print(data.get(group))
            if data.get(group).get(movie) == None:
                data.get(group)[movie] = []
                print(data.get(group).get(movie))
            if user not in data.get(group).get(movie):
                data.get(group).get(movie).append(user)
        else:
            del data.get(group)[movie]

        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)


def getMovie(group, user, path):
    data = getAllData(path)
    try:
        if data.get(group) == None:
            return None
        for k, v in data.get(group).items():
            if user not in v:
                return k
    except Exception as e:
        print(e)
    return None


def check(group, user, path):
    movie = getMovie(group, user, "../data/match.json")
    if movie != None:
        setMovie(group, user, movie, "../data/match.json", "like")
        return movie
    data = getAllData(path)
    length = 3  # Firebase length of userlist
    movie = None
    try:
        if data.get(group) == None:
            return None
        for k, v in data.get(group).items():
            if len(v) == length:
                movie = k
                data.get(group).pop(movie)
                writeMatch(k,group)
                break
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)
    return movie


def writeMatch(movie, group):
    # Firebase add match
    path = "../data/match.json"
    setData(group, list(movie), path)


def getLen(group, path, user):
    data = getData(group, path)
    length = 0
    try:
        if data == None:
            return length
        for k, v in data.items():
            if user not in v:
                length += 1
    except Exception as e:
        print(e)
    return length
