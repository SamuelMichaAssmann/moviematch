import requests

def getWatchInfo(watchlist):
    movie_list = []
    try:
        for movie_id in watchlist:
            movie = requests.get(f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1")
            movie = movie.json()
            genre = [id.get("id") for id in movie.get("genres")]
            movie_list.append({"genre_ids": genre, "vote_average": movie.get("vote_average")})
    except:
        pass
    return movie_list


def getGenreList():
    genrelist = requests.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d28d1550787892e34121c2918ec031b1')
    genrelist = genrelist.json().get("genres")
    g = []
    for genre in genrelist:
        g.append(genre.get("id"))
    return g


def defaultList():
    watchlist = 'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&page=100'
    r = requests.get(watchlist)
    r = r.json()
    result = r["results"]
    data = []
    for t in result:
        movie_id = t["id"]
        data.append(movie_id)
    return data