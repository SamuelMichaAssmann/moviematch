import requests
from backend.src.datamanager.datamatch import popMovie


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


def getGenre(genre_list):
    genre = []
    for g in genre_list:
        genre.append(g["name"])
    return ", ".join(genre)


def movieInfo(user, path):
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