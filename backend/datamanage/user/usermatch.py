from backend.datamanage.user.userdata import *
from backend.datamanage.cluster import *
from backend.firebase.firebase_db import *
from backend.datamanage.apidata import *
import threading


def movies(user, path):
    '''
    Find new movies for a user based on the Machine Learning data.
    :param user: The ID of the user.
    :param path: Path to the JSON file.
    '''
    watchlist = removeinit(get_watch_list(user))
    antiwatch = removeinit(get_antiwatch(user))
    clusters = cluster(watchlist, antiwatch)
    movies = get_movies(clusters, get_user_movie_data(user, path))
    set_user_movie_data(user, movies, path)


def user_match(user, path):
    '''
    Attempts to find a movie match (a movie suggestion for a single user).
    :param user: The ID of the user.
    :param path: The path to the JSON file.
    :return: The movie info, or message + status.
    '''
    if (get_user_movie_count(user, path) == 20) or (get_user_movie_count(user, path) == 0):
        threading.Thread(target=movies, args=(user, path,)).start()
    movie_id = get_movie_by_user(user, path)
    if movie_id != None:
        return retrieve_movie_info(movie_id)
    else:
        return 'No movie found!', 200