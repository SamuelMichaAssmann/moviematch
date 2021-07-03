from backend.datamanage.group.groupdata import *
from backend.datamanage.cluster import *
from backend.datamanage.apidata import *
import backend.firebase.firebase_db as db
import threading


def movies(group, path):
    data = db.fetchAWandGL_Groups(group)
    watchlist = removeinit(data.get('watchlist'))
    antiwatch = removeinit(data.get('antiwatch'))
    clusters = cluster(watchlist, antiwatch)
    movies = getMovies(clusters, getDataList(group, path))
    setData(group, movies, path)


def groupmatch(group, user, path):
    print(f"Length: {getLen(group, path, user)}")
    if (getLen(group, path, user) == 3) or (getLen(group, path, user) == 0):
        threading.Thread(target=movies, args=(group, path,)).start()
    movie_id = getMovie(group, user, path)
    if movie_id != None:
        return movieInfo(movie_id)
    else:
        return "Waiting for movies!", 200


def matchCheck(group, path):
    movie_id = check(group, path)
    if movie_id != None:
        return movieInfo(movie_id)
    else:
        return {"movie_id": "false"}