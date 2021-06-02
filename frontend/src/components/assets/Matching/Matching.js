import React, { useState, useEffect } from 'react';
import '../Section/Section.css'
import './Matching.css'
import Loading from '../Loading/Loading'
import RateButton from '../Button/RateButton'
import { MovieThumbnail } from '../Image/MovieThumbnail'
import { likeButton, neutralButton, dislikeButton } from './Data';
import { AiFillStar } from 'react-icons/ai';
import APIHandler from '../../manage/api/APIHandler';

const BASE_THUMBNAIL_URL = 'https://image.tmdb.org/t/p/w500';

function Matching({
    kind,
    dataPath,
    endpoint,
    thumbnailHeight,
    maxDescLength,
    emptyImage,
    showNeutral=true,
    onLike=null,
    onDislike=null,
    onNeutral=null,
    rowExtraClasses='',
    tableExtraClasses=''
}) {

    if (onLike == null) onLike = () => getMovie('like');
    if (onDislike == null) onDislike = () => getMovie('dislike');
    if (onNeutral == null) onNeutral = () => getMovie('neutral');

    const [state, setState] = useState({
        loaded: false,
        thumbnailSrc: '',
        title: '',
        desc: '',
        runtime: 0,
        rating: 0,
        genres: 'none'
    });

    const [like, setLike] = useState('');
    useEffect(() => {
        getMovie();
    }, []);


    const getMovie = (info) => {
        setLike(info);
        setState({
            loaded: false,
            thumbnailSrc: '',
            title: '',
            desc: '',
            runtime: 0,
            rating: 0,
            genres: 'none'
        });
     
        APIHandler.getRequest(endpoint, {
                "user_id": localStorage.getItem("uid"),
                "usage": kind,
                "path": dataPath
            }).then(data => {
            setState({
                loaded: true,
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
        }).catch(err => {
            setState({
                loaded: false,
                thumbnailSrc: '',
                title: '',
                desc: '',
                runtime: 0,
                rating: 0,
                genres: 'none'
            });
            setTimeout(() => getMovie(), 3000);
        });
    };

    return (
        <>
            <div className='darkBg'>

                <nav className='movieThumbnailDesktop'>

                    <div className={`movieThumbnailRow ${rowExtraClasses}`}>
                        {state.loaded ? "" : <Loading />}
                        <MovieThumbnail
                            src={state.thumbnailSrc}
                            height={thumbnailHeight}
                        />
                        <div>
                            <h2 className='movieTitle'>{state.title}</h2>
                            <p className='home__sek-subtitle movieDescription'>{state.desc}</p>
                        </div>
                    </div>
                    <div align='center'>
                        <RateButton {...likeButton} onClick={onLike} />
                        {showNeutral ? <RateButton {...neutralButton} onClick={onNeutral} /> : null}
                        <RateButton {...dislikeButton} onClick={onDislike} />
                    </div>
                </nav>
                <nav className='movieThumbnailMobile'>
                    <div>
                        <div className='movieThumbnailRow'>
                            {state.loaded ? "" : <Loading />}
                            <MovieThumbnail src={state.thumbnailSrc} height={thumbnailHeight} />
                            <div align='center'>
                                <RateButton {...likeButton} onClick={onLike} />
                                {showNeutral ? <RateButton {...neutralButton} onClick={onNeutral} /> : null}
                                <RateButton {...dislikeButton} onClick={onDislike} />
                            </div>
                            <div>
                                <h2 className='movieTitle'>{state.title}</h2>
                                <p className='home__sek-subtitle movieDescription'>{state.desc}</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="movieInfo">
                <table className={`movieTable ${tableExtraClasses}`}>
                    <tr>
                        <td className="movieRow">
                            <div>
                                <p className='movieInfoHeader'>Runtime</p>
                                <p className='movieInfoText'>{state.runtime} minutes</p>
                            </div>
                        </td>
                        <td className="movieRow">
                            <div>
                                <p className='movieInfoHeader'>Rating</p>
                                <p className='movieInfoText'><AiFillStar /> {state.rating}</p>
                            </div>
                        </td>
                        <td className="movieRow">
                            <div>
                                <p className='movieInfoHeader'>Genres</p>
                                <p className='movieInfoText'>{state.genres}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default Matching;