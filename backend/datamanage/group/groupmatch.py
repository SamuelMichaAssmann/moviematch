from backend.datamanage.group.groupdata import *
from backend.datamanage.cluster import *
import backend.firebase.firebase_db as db

import threading


def movies(group, path):
    data = db.fetchAWandGL_Groups(group)
    watchlist = data['watchlist'] # getWatchlist(user)
    antiwatch = data['antiwatch'] # getAntiwatch(user)
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

        