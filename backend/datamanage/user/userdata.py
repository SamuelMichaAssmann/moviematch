import json

def get_all_json_data(path):
    '''
    Get all data from a json file.
    :param path: Path to the JSON file.
    :return: The data (or None, if the file could not be loaded).
    '''
    try:
        with open(path) as file:
            return json.load(file)
    except Exception:
        cleanup(path)
        return None


def cleanup(path):
    '''
    Clean up JSON data. Call this in case of an error.
    :param path: Path to the JSON file.
    '''
    print('Error - Cleanup!')
    with open(path, 'w') as file:
            json.dump({}, file)


def set_user_movie_data(user, movies, path):
    '''
    Set user watch data (movie IDs in a JSON file).
    :param user: The ID of the user.
    :param movies: A list of movie IDs.
    :param path: Path to the JSON file.
    '''
    data = get_all_json_data(path)
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


def get_user_movie_data(user, path):
    '''
    Get watch data from a user.
    :param user: The ID of the user.
    :param path: Path to the JSON file.
    :return: The watch data.
    '''
    data = get_all_json_data(path)
    try:
        if data.get(user) == None:
            return []
        return data.get(user)
    except Exception as e:
        print(e)
        return []


def get_movie_by_user(user, path):
    '''
    Get a movie linked to a given user, or None if the user did not interact with this movie.
    :param user: The user ID.
    :param path: The path to the JSON file.
    :return: The movie ID or None.
    '''
    data = get_all_json_data(path)
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


def get_user_movie_count(user, path):
    '''
    Count how many movies a user has interacted with.
    :param user: The ID of the user.
    :param path: The path to the JSON file.
    :return: The amount of movies the user has interacted with in the group.
    '''
    if get_user_movie_data(user, path) == None:
        return 0
    return len(get_user_movie_data(user, path))