from backend.datamanage.user.userdata import *
from backend.datamanage.cluster import *
from backend.firebase.firebase_db import *

import threading


def movies(user, path):
    watchlist = getWatchlist(user)
    antiwatch = getAntiwatch(user)
    print("-------------------------------------")
    print(f"watchlist: {watchlist}")
    print(f"antiwatch: {antiwatch}")
    print("-------------------------------------")
    clusters = cluster(watchlist, antiwatch)
    movies = getMovies(clusters)
    setData(user, movies, path)


def usermatch(user, path):
    print(getLen(user, path))
    if (getLen(user, path) == 20) or (getLen(user, path) == 0):
        threading.Thread(target=movies, args=(user, path,)).start()
    movie_id = getMovie(user, path)
    if movie_id != None:
        return movieInfo(movie_id)
    else:
        return 'No movie found!', 200