import requests


def getGenre(genre_list):
    genre = []
    for g in genre_list:
        genre.append(g["name"])
    return ", ".join(genre)


def removeinit(matchlist):
    if matchlist == None:
        return []
    if 'initial item' in matchlist:
        matchlist.remove('initial item')
        if matchlist == None:
            return []
        return matchlist
    return matchlist


def movieInfo(movie_id):
    try:
        result = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
        movie = result.json()
        thumbnailSrc = movie["poster_path"]
        title = movie["title"]
        desc = movie["overview"]
        runtime = movie["runtime"]
        rating = movie["vote_average"]
        genres = getGenre(movie["genres"])
        return {"titel": title, "movie_id" :movie_id, "desc": desc, "runtime": runtime, "rating": rating, "genres": genres, "thumbnailSrc": thumbnailSrc}
    except  Exception as e:
        print(e)
        return None


def getElement(clusters):
    wert = max(clusters, key=lambda item:item[1])
    clusters.remove(wert)
    return wert


def getMovies(clusters, watchlist):
    movie_list = []
    while len(movie_list) <= 20:
        genre = getElement(clusters)[0]
        result = requests.get(f'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres={genre}')
        result = result.json()
        result = result["results"]
        for r in result:
            if r["id"] not in watchlist:
                movie_list.append(r["id"])
    return movie_list


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