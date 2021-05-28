import React, { useState, useEffect } from 'react';
import '../../assets/Section/Section.css';
import './Matching.css';
import Loading from '../../assets/Loading/Loading';
import RateButton from './RateButton';
import { MatchingType } from './MatchingType';
import { MovieThumbnail } from './MovieThumbnail';
import { likeButton, neutralButton, dislikeButton } from './Data';
import { AiFillStar } from 'react-icons/ai';
import APIHandler from '../../manage/api/APIHandler';

const BASE_THUMBNAIL_URL = 'https://image.tmdb.org/t/p/w500';
const IMAGE_HEIGHT = 400;
const MAX_DESC_LENGTH = 500;

/**
 * Renders and handles the movie matching UI + functionality.
 * This component is embeddable, and is thus used for the tutorial and group page too.
 * @param {MatchingType} type 
 */
function Matching(args) {
    const type = ('type' in args) ? args.type : MatchingType.NORMAL;

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
    const movie_id = '';

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
        })

        APIHandler.getRequest('http://localhost:5000/api/match', { "user_id": "username1" }).then(data => {
            setState({
                loaded: true,
                thumbnailSrc: (data.thumbnailSrc == null)
                    ? 'images/empty-thumbnail.png'
                    : BASE_THUMBNAIL_URL + data.thumbnailSrc,
                title: data.titel,
                desc: (data.desc.length > MAX_DESC_LENGTH)
                    ? data.desc.substring(0, MAX_DESC_LENGTH - 3) + '...'
                    : data.desc,
                runtime: data.runtime,
                rating: data.rating,
                genres: data.genres
            });
        }).catch(err => {
            setState({
                loaded: false,
            });
            setTimeout(() => getMovie(), 3000);

        });
    };

    return (
        <>
            <div className='darkBg'>

                <nav class='movieThumbnailDesktop'>

                    <div className={`movieThumbnailRow ${(type == MatchingType.GROUP ? 'movieThumbnailRowGroup' : '')}`}>
                        {state.loaded ? "" : <Loading />}
                        <MovieThumbnail
                            src={state.thumbnailSrc}
                            height={IMAGE_HEIGHT}
                        />
                        <div>
                            <h2 className='movieTitle'>{state.title}</h2>
                            <p className='home__sek-subtitle movieDescription'>{state.desc}</p>
                        </div>
                    </div>
                    <div align='center'>
                        <RateButton {...likeButton} onClick={() => getMovie('like')} />
                        <RateButton {...neutralButton} onClick={() => getMovie('neutral')} />
                        <RateButton {...dislikeButton} onClick={() => getMovie('dislike')} />
                    </div>
                </nav>
                <nav class='movieThumbnailMobile'>
                    <div>
                        <div className='movieThumbnailRow'>
                            {state.loaded ? "" : <Loading />}
                            <MovieThumbnail src={state.thumbnailSrc} height={IMAGE_HEIGHT} />
                            <div align='center'>
                                <RateButton {...likeButton} onClick={() => getMovie('like')} />
                                <RateButton {...neutralButton} onClick={() => getMovie('neutral')} />
                                <RateButton {...dislikeButton} onClick={() => getMovie('dislike')} />
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
                <table className={`movieTable ${type == MatchingType.GROUP ? 'movieTableGroup' : ''}`}>
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