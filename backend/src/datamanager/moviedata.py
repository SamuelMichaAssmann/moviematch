import requests
from backend.src.ai.genrecluster import getElement


def idToKeywords(movie_id):
    r = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=d28d1550787892e34121c2918ec031b1')
    keywords = r.json()["keywords"]
    tab = []
    for key in keywords:
        tab.append(key["id"])
    return tab


def idToRuntime(movie_id):
    r = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
    run = r.json()
    return run["runtime"]


def getNewMovies(clusters):
    movie_id_list = []
    while len(movie_id_list) <= 20:
        genre = getElement(clusters)[0]
        r = requests.get(f'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres={genre}')
        new = r.json()
        new = new["results"]
        for n in new:
            movie_id_list.append(n["id"])
    return movie_id_list



