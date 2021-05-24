#!/usr/bin/env python
# coding: utf-8

import json
import requests
import random
import threading

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


def movie_ids_list(data):
    movie_list = []
    for d in data:
        (movie_id, genre_list, keyword_list, runtime) = d
        movie_list.append(movie_id)
    return movie_list

def save(newMovies):
    textfile = open("tempsave_forTest.txt", "w")
    for e in newMovies:
        textfile.write(str(e) + "\n")
    textfile.close()

def load():
    newMovies = []
    try:
        with open("tempsave_forTest.txt") as f:
            for line in f:
                newMovies.append(int(line))
    except:
        pass
    return newMovies

def getGenre(genre_list):
    genre = []
    for g in genre_list:
        genre.append(g["name"])
    return genre

def reload():
    print("Reload...")
    result = processUrl(watchlist)
    data = getData(result)
    summed = sumUpData(data)
    select = ramdomSelect(summed)
    movie = newMovie(select)
    new = getData(movie)
    end = sortOut(data, new)
    movie_list = movie_ids_list(end)
    print(movie_list)
    save(movie_list + load())

def prettifyGenre(genre_list):
    return ", ".join(genre_list)


def matchfilm():
    movie_id_list = load()
    
    if len(movie_id_list) < 20:
        threading.Thread(name='reload', target=reload).start()
        movie_id_list = load()
    
    if len(movie_id_list) == 0:
        return 'bad request!', 400
    

    r = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1')
    movie = r.json()
    thumbnailSrc = movie["poster_path"]
    title = movie["title"]
    desc = movie["overview"]
    runtime = movie["runtime"]
    rating = movie["vote_average"]
    genres = prettifyGenre(getGenre(movie["genres"]))

    return {"titel": title, "desc": desc, "runtime": runtime, "rating": rating, "genres": genres, "thumbnailSrc": thumbnailSrc}