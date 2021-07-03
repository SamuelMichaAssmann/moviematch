import json

'''
Get all data from a json file.
:param path: Path to the JSON file.
:return: The data (or None, if the file could not be loaded).
'''
def get_all_json_data(path):
    try:
        with open(path) as file:
            return json.load(file)
    except Exception:
        cleanup(path)
        return None

'''
Clean up JSON data. Call this in case of an error.
:param path: Path to the JSON file.
'''
def cleanup(path):
    print('Error - Cleanup!')
    with open(path, 'w') as file:
        json.dump({}, file)

'''
Set group watch data (movie IDs in a JSON file).
:param group: The ID of the group.
:param movies: A list of movie IDs.
:param path: Path to the JSON file.
'''
def set_group_movie_data(group, movies, path):
    data = get_all_json_data(path)
    try:
        if data.get(group) == None:
            data[group] = {}
        for movie in movies:
            data.get(group)[movie] = []
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)

'''
Get watch data from a group.
:param group: The ID of the group.
:param path: Path to the JSON file.
:return: The watch data.
'''
def get_group_movie_data(group, path):
    data = get_all_json_data(path)
    try:
        if data.get(group) == None:
            data[group] = {}
        return data.get(group)
    except Exception as e:
        print(e)

'''
Get a list of movie IDs from a group.
:param group: The ID of the group.
:param path: Path to the JSON file.
:return: The list of movie IDs.
'''
def get_group_movie_list(group, path):
    data = get_all_json_data(path)
    try:
        if data.get(group) == None:
            return []
        return data.get(group).keys()
    except Exception as e:
        print(e)

'''
Register that a movie in a group has been liked or disliked.
:param group: The ID of the group.
:param user: The ID of the user.
:param movie: The ID of the movie.
:param path: The path to the JSON file to register the data in.
:param kind: 'like' or 'dislike'.
'''
def set_movie(group, user, movie, path, kind):
    data = get_all_json_data(path)
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

'''
Get a movie linked to a given user in a given group, or None if the user did not interact with this movie.
:param group: The group ID.
:param user: The user ID.
:param path: The path to the JSON file.
:return: The movie ID or None.
'''
def get_movie_in_group(group, user, path):
    data = get_all_json_data(path)
    try:
        if data.get(group) == None:
            return None
        for k, v in data.get(group).items():
            if user not in v:
                return k
    except Exception as e:
        print(e)
    return None


def check(group, path):
    data = get_all_json_data(path)
    length = 3  # Firebase length of userlist
    movie = None
    try:
        if data.get(group) == None:
            return None
        for k, v in data.get(group).items():
            if len(v) == length:
                movie = k
                data.get(group).pop(movie)
                break
        with open(path, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(e)
    return movie

'''
Count how many movies a user has interacted with in a given group.
:param group: The ID of the group.
:param path: The path to the JSON file.
:param user: The ID of the user.
:return: The amount of movies the user has interacted with in the group.
'''
def get_user_group_movie_count(group, path, user):
    data = get_group_movie_data(group, path)
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
