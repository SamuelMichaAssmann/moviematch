import React, { useState, useEffect } from 'react';
import '../../assets/Section/Section.css'
import './Matching.css'
import Loading from '../../assets/Loading/Loading'
import RateButton from './RateButton'
import { MovieThumbnail } from './MovieThumbnail'
import { likeButton, neutralButton, dislikeButton } from './Data';
import { AiFillStar } from 'react-icons/ai'

const BASE_THUMBNAIL_URL = 'https://image.tmdb.org/t/p/w500';
const IMAGE_HEIGHT = 400;
const MAX_DESC_LENGTH = 500;

function Matching() {
    const [state, setState] = useState({
        loaded: false,
        thumbnailSrc: '',
        title: '',
        desc: '',
        runtime: 0,
        rating: 0,
        genres: ''
    });

    const [like, setLike] = useState('')

    useEffect(() => {
        getMovie();
    }, [])


    const getMovie = (info) => {
        setLike(info);
        setState({loaded: false})

        fetch('/api/match').then(res => res.json()).then(data => {
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
                    <div>
                        <div className='movieThumbnailRow'>
                            <MovieThumbnail
                                src={state.thumbnailSrc}
                                height={IMAGE_HEIGHT}
                            />
                            <div>
                                {state.loaded ? "" : <Loading />}
                                <h2 className='movieTitle'>{state.title}</h2>
                                <p className='home__sek-subtitle movieDescription'>{state.desc}</p>
                            </div>
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
                            {state.loaded ? <MovieThumbnail src={state.thumbnailSrc} height={IMAGE_HEIGHT} /> : <Loading />}
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
            <div>
                <div className='movieInfoRow'>
                    <div className='movieInfoElement'>
                        <h2 className='movieInfoHeader'>Runtime</h2>
                        <p className='home__sek-subtitle movieInfoText'>{state.runtime} minutes</p>
                    </div>
                    <div className='movieInfoElement'>
                        <h2 className='movieInfoHeader'>Rating</h2>
                        <p className='home__sek-subtitle movieInfoText'><AiFillStar /> {state.rating}</p>
                    </div>
                    <div className='movieInfoElement'>
                        <h2 className='movieInfoHeader'>Genres</h2>
                        <p className='home__sek-subtitle movieInfoText'>{state.genres}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Matching;