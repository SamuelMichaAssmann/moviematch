import requests


def get_genres_string(genre_list):
    '''
    Get a string of genres based on a list of genre data.
    :param genre_list: A list of genre data.
    :return: The string of genres.
    '''
    genre = []
    for g in genre_list:
        genre.append(g['name'])
    return ', '.join(genre)


def removeinit(matchlist):
    '''
    Remove the initial item of a match list.
    :param matchlist: The match list.
    :return: The match list without the initial item.
    '''
    if matchlist == None:
        return []
    if 'initial item' in matchlist:
        matchlist.remove('initial item')
        if matchlist == None:
            return []
        return matchlist
    return matchlist


def retrieve_movie_info(movie_id):
    '''
    Request information about a movie from TheMovieDB.
    :param movie_id: The ID of the movie.
    :return: Information about this movie as a dictionary.
    '''
    try:
        result = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
        movie = result.json()
        thumbnail_src = movie['poster_path']
        title = movie['title']
        desc = movie['overview']
        runtime = movie['runtime']
        rating = movie['vote_average']
        genres = get_genres_string(movie['genres'])
        return {'titel': title, 'movie_id': movie_id, 'desc': desc, 'runtime': runtime, 'rating': rating,
            'genres': genres, 'thumbnailSrc': thumbnail_src}
    except Exception as e:
        print(e)
        return None


def get_element(clusters):
    value = max(clusters, key=lambda item:item[1])
    clusters.remove(value)
    return value


def get_movies(clusters, watchlist):
    '''
    Find new movies based on the current watch list.
    :param clusters: The Machine Learning clusters to base the result on.
    :param watchlist: The current watch list.
    :return: The new movie list.
    '''
    movie_list = []
    while len(movie_list) <= 20:
        genre = get_element(clusters)[0]
        result = requests.get(f'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres={genre}')
        result = result.json()
        result = result['results']
        for r in result:
            if r['id'] not in watchlist:
                movie_list.append(r['id'])
    return movie_list


def get_watch_info(watchlist):
    '''
    Get information for all movies in a watch list.
    :param watchlist: The watch list with movie IDs.
    :returns: A list of movie information.
    '''
    movie_list = []
    try:
        for movie_id in watchlist:
            movie = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
            movie = movie.json()
            genre = [id.get('id') for id in movie.get('genres')]
            movie_list.append({'genre_ids': genre, 'vote_average': movie.get('vote_average')})
    except Exception:
        pass
    return movie_list


def get_genre_list():
    '''
    Get a list of all genres acknowledged by TheMovieDB.
    :return: A list of genre IDs.
    '''
    genrelist = requests.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d28d1550787892e34121c2918ec031b1')
    genrelist = genrelist.json().get('genres')
    g = []
    for genre in genrelist:
        g.append(genre.get('id'))
    return g


def get_default_movie_list():
    '''
    Get a list of default movie IDs, for when the Machine Learning model does not have enough data to make predictions.
    :return: The list of movie IDs.
    '''
    watchlist = 'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&page=100'
    r = requests.get(watchlist)
    r = r.json()
    result = r['results']
    data = []
    for t in result:
        movie_id = t['id']
        data.append(movie_id)
    return data
