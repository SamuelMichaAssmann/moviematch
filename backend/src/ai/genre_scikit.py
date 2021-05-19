#!/usr/bin/env python
# coding: utf-8

# In[2]:


import numpy as np
from sklearn.cluster import MeanShift# as ms
from sklearn.datasets.samples_generator import make_blobs
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import style
import requests
style.use("ggplot")


# In[3]:


url1 = [567189, 811367, 632357, 726684]
url2 = [578701, 587807, 412656, 804435]


# In[ ]:


# url1 = 'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&include_adult=false&include_video=false'
# url2= 'https://api.themoviedb.org/3/discover/movie?api_key=d28d1550787892e34121c2918ec031b1&include_adult=false&include_video=false&with_genres=10402'


# In[4]:


def getWatchlist(watchlist):
    movie_list = []
    try:
        for movie_id in watchlist:
            movie = requests.get(f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=d28d1550787892e34121c2918ec031b1")
            movie = movie.json()
            genre = [id.get("id") for id in movie.get("genres")]

            movie_list.append({"genre_ids": genre,
                              "vote_average": movie.get("vote_average")
                              })
    except:
        pass
    return movie_list


# In[5]:


def getGenre():
    genrelist = requests.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d28d1550787892e34121c2918ec031b1')
    genrelist = genrelist.json().get("genres")
    g = []
    for genre in genrelist:
        g.append(genre.get("id"))
    return g


# In[6]:


def genreToPoints(watchlist):
    genre = getGenre()
    movie_list = getWatchlist(watchlist)
    points = []
    for movie in movie_list:
        movie_genre = movie.get("genre_ids")
        point = []
        for g in genre:
            if g in movie_genre:
                point.append(movie.get("vote_average"))
            else:
                point.append(-1)
        points.append(point)
    return np.array(points)


# In[15]:


def cluster(watchlist):
    centers = genreToPoints(watchlist)

    X, _ = make_blobs(n_samples = 400, centers = centers, cluster_std = 0.05)
    ms = MeanShift()
    ms.fit(X)
    labels = ms.labels_
    cluster_centers = ms.cluster_centers_

    print(cluster_centers)

    n_clusters_ = len(np.unique(labels))

    print("Number of estimated clusters:", n_clusters_)

    colors = 10*['r','g','b','c','k','y','m']

    print(f'Labels: {labels}')

    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    for i in range(len(X)):
        ax.scatter(X[i][0], X[i][1], X[i][2], c=colors[labels[i]], marker='o')


    ax.scatter(cluster_centers[:,0],cluster_centers[:,1],cluster_centers[:,2],
                marker="x",color='k', s=150, linewidths = 5, zorder=10)

    plt.show()

    top = []
    genre = getGenre()
    for cluster in cluster_centers:
        arr = cluster.tolist()
        for g in genre:
            top.append((g, arr[genre.index(g)]))
            
    return top


# In[16]:


def getMax(cluster):
    return max(cluster, key=lambda item:item[1])


# In[17]:


cluster(url1)


# In[11]:


getMax(cluster(url1))


# In[12]:


getMax(cluster(url2))


# In[13]:


getMax(cluster(url1 + url2))


# In[ ]:




