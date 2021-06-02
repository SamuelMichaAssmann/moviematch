import requests
import json
import threading
from backend.src.ai.genrecluster import cluster
from backend.src.datamanager.localdata import getAllData
from backend.src.datamanager.moviedata import getNewMovies
from backend.src.datamanager.localdata import setData
from backend.firebase.firebase_db import *
from backend.src.datamanager.apidata import defaultList


def generate(user, path):
    print("Generate stated...")
    watchlist = getWatchlist(user) # [6978, 137, 762, 36819, 849, 2493]
    antiwatch = getAntiwatch(user) # [4923, 6116, 9067, 27318, 36685]
    clusters = cluster(watchlist, antiwatch)
    new = getNewMovies(clusters)
    setData(user, new, path)   
    print("Generate finished!") 


def getGenre(genre_list):
    genre = []
    for g in genre_list:
        genre.append(g["name"])
    return ", ".join(genre)


def popMovie(user, path):
    data = getAllData(path)
    newMovies = False
    movie = None

    if data.get(user) != None:
        if len(data[user]) == 20 or len(data[user]) == 0:
            newMovies = True
        try:
            movie = data[user].pop()
            with open(path, 'w') as file:
                json.dump(data, file)
        except (FileNotFoundError, IndexError):
            pass
    else:
        print("new userdata needed")
        setData(user, [], path)  
        new = defaultList()
        setData(user, new, path)
        movie = popMovie(user, path)
    
    if newMovies:
        threading.Thread(target=generate, args=(user, path,)).start()
    return movie


def groupMovie(user, group, path):
    movie_id = popMovie(user, path)
    if (movie_id == None):
        return 'Loading...', 200
    try:
        r = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
        movie = r.json()
        thumbnailSrc = movie["poster_path"]
        title = movie["title"]
        desc = movie["overview"]
        runtime = movie["runtime"]
        rating = movie["vote_average"]
        genres = getGenre(movie["genres"])
        return {"titel": title, "desc": desc, "runtime": runtime, "rating": rating, "genres": genres, "thumbnailSrc": thumbnailSrc}
    except KeyError:
        return 'Error no movie', 404