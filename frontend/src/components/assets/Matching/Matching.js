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

// The Matching component handles movie matching, i.e. requesting a new movie based on the Machine Learning
// model on the backend, then liking, disliking or skipping the movie to feed more info into this model.
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
    const [match, setMatch] = useState({hasMatch: false});

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

    /**
     * Request a new movie when the component is first mounted.
     * Once the component becomes unmounted, stop requesting new movies.
     */
    useEffect(() => {
        getMovie();
        return () => {
            mounted.current = false;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Get a new movie to show the user based on previous input.
     * @param {String} kind 'like' or 'dislike' depending on user input.
     */
    const getMovie = (kind) => {
        if (!mounted.current) {
            return;
        }
        
        // If the user had previously liked or disliked a movie, register this info.
        if (state.movieId) {
            APIHandler.postRequest(setEndpoint, {
                "user_id": localStorage.getItem("uid"),
                "group_id": new URLSearchParams(window.location.search).get('id'),
                "movie_id": state.movieId,
                "kind": kind,
                "path": dataPath
            }).then(matchData => {
                console.log(matchData);
                console.log(matchData.movie_id);
                console.log(matchData.titel);
                if (matchData.movie_id !== 'false') {
                    setMatch({
                        hasMatch: true,
                        title: matchData.titel,
                        desc: matchData.desc,
                        runtime: matchData.runtime,
                        rating: matchData.rating,
                        genres: matchData.genres,
                        thumbnailSrc: matchData.thumbnailSrc
                    });
                    console.log("Error: ")
                    console.log(match);
                } else {
                    setMatch({hasMatch: false});
                }
            }).catch(() => {
                // Errors during set are fine, just load a new movie.
            });
        }

        // Reset movie info while a new movie is being requested.
        setState({
            ...state,
            loaded: false,
            runtime: 0,
            rating: 0,
            genres: 'none'
        });

        // Request a new movie.
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
                        <p className={lightbg
                            ? 'home__sek-subtitle lightmovieDescription'
                            : 'home__sek-subtitle darkmovieDescription'}>{state.desc}</p>
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