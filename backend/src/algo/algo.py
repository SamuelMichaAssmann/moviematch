#!/usr/bin/env python
# coding: utf-8



import requests
import random


watchlist = 'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&page=100'


def processUrl(url):
    r = requests.get(url)
    r_list = r.json()
    r_list = r_list["results"]
    return r_list


def getData(result):
    data = []
    for t in result:
        movie_id = t["id"]
        genre_list = t["genre_ids"]
        keyword_list = idToKeywords(movie_id)
        runtime = idToRuntime(movie_id)
        data.append((movie_id, genre_list, keyword_list, runtime))
        
    return data


def sumUpData(data):
    movie_all = []
    genre_all = []
    keywords_all = []
    runtime_all = []
    
    for d in data:
        (movie_id, genre_list, keyword_list, runtime) = d
        movie_all.append(movie_id)
        for g in genre_list:
            genre_all.append(g)
        for k in keyword_list:
            keywords_all.append(k)
        runtime_all.append(runtime)
    return (movie_all, genre_all, keywords_all, runtime_all)


def ramdomSelect(data):
    (movie_all, genre_all, keywords_all, runtime_all) = data
    return (random.choice(genre_all), random.choice(keywords_all), random.choice(runtime_all))


def idToKeywords(movie_id):
    r = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=d28d1550787892e34121c2918ec031b1')
    keywords = r.json()
    keywords = keywords["keywords"]
    
    tab = []
    for key in keywords:
        tab.append(key["id"])
    return tab


def idToRuntime(movie_id):
    r = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
    run = r.json()
    return run["runtime"]


def newMovie(data):
    (genre, keyword, runtime) = data
    r = requests.get(f'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres={genre}&with_keywords={keyword}')
    new = r.json()
    new = new["results"]
    return new


def sortOut(watchlist, new):
    fin = []
    for n in new:
        if n not in watchlist:
            fin.append(n)
    return fin


def toString(data):
    for d in data:
        (movie_id, genre_list, keyword_list, runtime) = d
        print(f"MovieID: {movie_id} - Len: {runtime} - Genre: {genre_list} - Keywords: {keyword_list}\n")


result = processUrl(watchlist)
data = getData(result)
summed = sumUpData(data)
select = ramdomSelect(summed)
movie = newMovie(select)
new = getData(movie)
end = sortOut(data, new)
toString(end)

print("Done!")
