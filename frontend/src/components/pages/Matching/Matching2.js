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

    useEffect(() => {
        getMovie();
    }, [])

    const getMovie = () => {
        fetch('/api/match',{
            retries: 3,
            retryDelay: 1000
          }).then(res => res.json()).then(data => {
            setState({
                loaded: true,
                thumbnailSrc: BASE_THUMBNAIL_URL + data.thumbnailSrc,
                title: data.titel,
                desc: data.desc,
                runtime: data.runtime,
                rating: data.rating,
                genres: data.genres
            });
        })
        .catch(err => {
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
                            <MovieThumbnail src={state.thumbnailSrc} height={IMAGE_HEIGHT} />
                            <div>
                                {state.loaded ? "" : <Loading />}
                                <h2 className='movieTitle'>{state.title}</h2>
                                <p className='home__sek-subtitle movieDescription'>{state.desc}</p>
                            </div>
                        </div>
                    </div>
                    <div align='center'>
                        <RateButton {...likeButton} onClick={() => getMovie('like')} />
                        <RateButton {...neutralButton} />
                        <RateButton {...dislikeButton} />
                    </div>
                </nav>
                <nav class='movieThumbnailMobile'>
                    <div>
                        <div className='movieThumbnailRow'>
                            <MovieThumbnail src={state.thumbnailSrc} height={IMAGE_HEIGHT} />
                            <div align='center'>
                                <RateButton {...likeButton} onClick={() => getMovie('like')} />
                                <RateButton {...neutralButton} />
                                <RateButton {...dislikeButton} />
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
