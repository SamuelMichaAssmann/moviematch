import React, { useState, useEffect, useRef } from 'react';
import '../Section/Section.css';
import './Matching.css';
import Loading from '../Loading/Loading';
import RateButton from '../Button/RateButton';
import { MovieThumbnail } from '../Image/MovieThumbnail';
import { likeButton, neutralButton, dislikeButton } from './Data';
import APIHandler from '../../manage/api/APIHandler';
import MovieInfo from './MovieInfo/MovieInfo';
import Match from '../Match/Match';

const BASE_THUMBNAIL_URL = 'https://image.tmdb.org/t/p/w500';

function Matching({
    lightbg,
    dataPath,
    getEndpoint,
    setEndpoint,
    thumbnailHeight,
    maxDescLength,
    emptyImage,
    showNeutral = true,
    onLike = null,
    onDislike = null,
    onNeutral = null,
    rowExtraClasses = '',
    tableExtraClasses = '',
}) {
    const [match, setMatch] = useState({
        hasMatch: false,
        title: "Teststring",
        runtime: 0,
        rating: 0,
        genres: 'none',
    });

    const mounted = useRef(() => ({ current: true }), []);

    const [state, setState] = useState({
        loaded: false,
        runtime: 0,
        rating: 0,
        genres: 'none'
    });

    if (onLike == null) onLike = () => getMovie('like');
    if (onDislike == null) onDislike = () => getMovie('dislike');
    if (onNeutral == null) onNeutral = () => getMovie('neutral');

    useEffect(() => {
        getMovie();
        return () => {
            mounted.current = false;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getMovie = (kind) => {
        if (!mounted.current) {
            return;
        }
        
        if (state.movieId) {
            APIHandler.postRequest(setEndpoint, {
                "user_id": localStorage.getItem("uid"),
                "group_id": new URLSearchParams(window.location.search).get('id'),
                "movie_id": state.movieId,
                "kind": kind,
                "path": dataPath
            }).then(data => {
                console.log(data);
                const matchmovie = data.movie_id;
                console.log(data.movie_id);
                console.log(data.titel);
                if (matchmovie !== "false") {
                    setMatch({
                        hasMatch: true,
                        title: data.titel,
                        desc: data.desc,
                        runtime: data.runtime,
                        rating: data.rating,
                        genres: data.genres,
                        thumbnailSrc: data.thumbnailSrc
                    });
                    console.log("Error: ")
                    console.log(match);
                }
            }).catch(() => {
                // Errors during set are fine, just load a new movie.
            });
        }

        setState({
            ...state,
            loaded: false,
            runtime: 0,
            rating: 0,
            genres: 'none'
        });

        APIHandler.getRequest(getEndpoint, {
            "user_id": localStorage.getItem("uid"),
            "group_id": new URLSearchParams(window.location.search).get('id'),
            "path": dataPath
        }).then(data => {
            setState({
                ...state,
                loaded: true,
                movieId: data.movie_id,
                thumbnailSrc: (data.thumbnailSrc == null)
                    ? emptyImage
                    : BASE_THUMBNAIL_URL + data.thumbnailSrc,
                title: data.titel,
                desc: (data.desc.length > maxDescLength)
                    ? data.desc.substring(0, maxDescLength - 3) + '...'
                    : data.desc,
                runtime: data.runtime,
                rating: data.rating,
                genres: data.genres
            });
        }).catch(() => {
            setTimeout(() => getMovie(), 1000);
        });
    };

    return (
        <>
            <div className={lightbg ? 'lightBg' : 'darkBg'}>
                <div className={`movieThumbnailRow ${rowExtraClasses}`}>
                    {state.loaded || lightbg ?
                        <MovieThumbnail
                            src={state.thumbnailSrc}
                            height={thumbnailHeight}
                        /> : <Loading />}
                    {lightbg ? '' :
                        <div className='movieThumbnailMobile' align='center'>
                            <RateButton {...likeButton} onClick={onLike} />
                            {showNeutral ? <RateButton {...neutralButton} onClick={onNeutral} /> : null}
                            <RateButton {...dislikeButton} onClick={onDislike} />
                        </div>}
                    <div>
                        <h2 className={lightbg ? 'lightmovieTitle' : 'darkmovieTitle'}>{state.title}</h2>
                        <p className={lightbg ? 'home__sek-subtitle lightmovieDescription' : 'home__sek-subtitle darkmovieDescription'}>{state.desc}</p>
                    </div>
                </div>
                {lightbg ? '' :
                    <div className='movieThumbnailDesktop' align='center'>
                        <RateButton {...likeButton} onClick={onLike} />
                        {showNeutral ? <RateButton {...neutralButton} onClick={onNeutral} /> : null}
                        <RateButton {...dislikeButton} onClick={onDislike} />
                    </div>}
            </div>
            <MovieInfo {... {
                runtime: state.runtime,
                rating: state.rating,
                genres: state.genres,
                tableExtraClasses: tableExtraClasses,
            }} />
            
            {match.hasMatch ? <Match 
                title={match.title}
                desc={match.desc}
                runtime={match.runtime}
                rating={match.rating}
                genres={match.genres}
                thumbnailSrc={BASE_THUMBNAIL_URL + match.thumbnailSrc}
                onClick={() => setMatch({hasMatch: false})}
                /> : null}
        </>
    );
}

export default Matching;