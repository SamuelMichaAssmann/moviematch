from backend.datamanage.group.groupdata import *
from backend.datamanage.cluster import *
from backend.datamanage.apidata import *
import backend.firebase.firebase_db as db
import threading

'''
Find new movies for a group based on the Machine Learning data.
:param group: The ID of the group.
:param path: Path to the JSON file.
'''
def movies(group, path):
    data = db.remove_watchlist_antiwatch_duplicates(group)
    watchlist = removeinit(data.get('watchlist'))
    antiwatch = removeinit(data.get('antiwatch'))
    clusters = cluster(watchlist, antiwatch)
    movies = get_movies(clusters, get_group_movie_list(group, path))
    set_group_movie_data(group, movies, path)

'''
Attempts to find a group match (a movie suggestion for the entire group).
:param group: The ID of the group.
:param user: The ID of the user.
:param path: The path to the JSON file.
:return: The movie info, or message + status.
'''
def group_match(group, user, path):
    print(f'Length: {get_user_group_movie_count(group, path, user)}')
    if (get_user_group_movie_count(group, path, user) == 3) or (get_user_group_movie_count(group, path, user) == 0):
        threading.Thread(target=movies, args=(group, path,)).start()
    movie_id = get_movie_in_group(group, user, path)
    if movie_id != None:
        return retrieve_movie_info(movie_id)
    else:
        return 'Waiting for movies!', 200


'''
Check if a match can be established.
:param group: The ID of the group.
:param path: The path to the JSON file.
'''
def match_check(group, user, path):
    movie_id = check(group, user, path)
    if movie_id != None:
        return retrieve_movie_info(movie_id)
    else:
        return {'movieId' : 'false'}
