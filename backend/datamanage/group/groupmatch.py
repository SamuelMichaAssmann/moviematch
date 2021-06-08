from backend.datamanage.group.groupdata import *
from backend.datamanage.cluster import *
from backend.firebase.firebase_db import *

import threading


def movies(group, path):
    watchlist = [395991, 141, 131, 503, 11128] # getWatchlist(user)
    antiwatch = [16258, 44113, 1696, 418078] # getAntiwatch(user)
    clusters = cluster(watchlist, antiwatch)
    movies = getMovies(clusters)
    setData(group, movies, path)


def groupmatch(group, user, path):
    print(f"Length: {getLen(group, path, user)}")
    if (getLen(group, path, user) == 3) or (getLen(group, path, user) == 0):
        threading.Thread(target=movies, args=(group, path,)).start()
    movie_id = getMovie(group, user, path)
    if movie_id != None:
        return movieInfo(movie_id)
    else:
        return 'No movie found!', 200