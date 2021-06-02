import numpy as np
from sklearn.cluster import MeanShift
from sklearn.datasets import make_blobs
from backend.src.datamanager.apidata import getGenreList
from backend.src.datamanager.apidata import getWatchInfo
from backend.src.datamanager.apidata import defaultList


def genreToPoints(watchlist, antilist):
    genre = getGenreList()
    watchlist = getWatchInfo(watchlist)
    antilist = getWatchInfo(antilist)
    points = []
    for movie in watchlist:
        movie_genre = movie.get("genre_ids")
        point = []
        for g in genre:
            if g in movie_genre:
                point.append(movie.get("vote_average"))
            else:
                point.append(-1)
        points.append(point)
    for movie in antilist:
        movie_genre = movie.get("genre_ids")
        point = []
        for g in genre:
            if g in movie_genre:
                point.append(-1)
            else:
                point.append(10 - movie.get("vote_average"))
        points.append(point)
    return np.array(points)


def cluster(watchlist, antilist):
    if watchlist == [] and antilist == []:
        watchlist = defaultList()
    centers = genreToPoints(watchlist, antilist)
    X, _ = make_blobs(n_samples = 100, centers = centers, cluster_std = 0.05)
    ms = MeanShift()
    ms.fit(X)
    cluster_centers = ms.cluster_centers_
    new = []
    genre = getGenreList()
    for cluster in cluster_centers:
        arr = cluster.tolist()
        for g in genre:
            new.append((g, arr[genre.index(g)]))
    return list(new)


def getElement(clusters):
    wert = max(clusters, key=lambda item:item[1])
    clusters.remove(wert)
    return wert