from backend.datamanage.apidata import *

import numpy as np
from sklearn.cluster import MeanShift
from sklearn.datasets import make_blobs


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
    print(watchlist)
    centers = genreToPoints(watchlist, antilist)
    X, _ = make_blobs(n_samples = 100, centers = centers, cluster_std = 0.05)
    ms = MeanShift()
    ms.fit(X)
    cluster_centers = ms.cluster_centers_
    movies = []
    genre = getGenreList()
    for cluster in cluster_centers:
        arr = cluster.tolist()
        for g in genre:
            movies.append((g, arr[genre.index(g)]))
    return list(movies)