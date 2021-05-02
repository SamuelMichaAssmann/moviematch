import React from 'react';
import '../../assets/Section/Section.css'
import './Matching.css'
import RateButton from './RateButton'
import MovieDBHandler from '../../manage/api/MovieDBHandler'
import { MovieThumbnail } from './MovieThumbnail'
import { likeButton, neutralButton, dislikeButton } from './Data';
import { AiFillStar } from 'react-icons/ai'

const BASE_THUMBNAIL_URL = 'https://image.tmdb.org/t/p/w500';
const IMAGE_HEIGHT = 400;

export default class Matching extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      thumbnailSrc: '',
      title: '',
      desc: '',
      runtime: 0,
      rating: 0,
      genres: ''
    };

    this.loadNewMovie = this.loadNewMovie.bind(this);
    this.loadNewMovie();
  }

  async loadNewMovie() {
    let movies = await MovieDBHandler.findMovies();
    let id = movies[Math.floor(Math.random() * movies.length)]['id'];
    let movieInfo = await MovieDBHandler.getMovieInfo(id);

    console.log(movieInfo);

    const genreString = movieInfo['genres']
      .map(genreInfo => genreInfo['name'])
      .join(', ');

    this.setState({
      loaded: true,
      thumbnailSrc: BASE_THUMBNAIL_URL + movieInfo['poster_path'],
      title: movieInfo['title'],
      desc: movieInfo['overview'],
      runtime: movieInfo['runtime'],
      rating: movieInfo['vote_average'],
      genres: genreString
    });
  }

  render() {
    return this.state.loaded
      ? (
        <>
          <div className='darkBg'>
            <div>
              <div className='movieThumbnailRow'>
                <MovieThumbnail src={this.state.thumbnailSrc} height={IMAGE_HEIGHT} />
                <div>
                  <h2 className='movieTitle'>{this.state.title}</h2>
                  <p className='home__sek-subtitle movieDescription'>{this.state.desc}</p>
                </div>
              </div>
            </div>
            <div align='center'>
              <RateButton {...likeButton} onClick={this.loadNewMovie} />
              <RateButton {...neutralButton} />
              <RateButton {...dislikeButton} />
            </div>
          </div>
          <div>
            <div className='movieInfoRow'>
              <div className='movieInfoElement'>
                <h2 className='movieInfoHeader'>Runtime</h2>
                <p className='home__sek-subtitle movieInfoText'>{this.state.runtime} minutes</p>
              </div>
              <div className='movieInfoElement'>
                <h2 className='movieInfoHeader'>Rating</h2>
                <p className='home__sek-subtitle movieInfoText'><AiFillStar /> {this.state.rating.toFixed(1)}</p>
              </div>
              <div className='movieInfoElement'>
                <h2 className='movieInfoHeader'>Genres</h2>
                <p className='home__sek-subtitle movieInfoText'>{this.state.genres}</p>
              </div>
            </div>
          </div>
        </>
      )

      : (
        <>
          <div className='darkBg'>
            <div className='matchEmpty' style={{ height: IMAGE_HEIGHT + 85 }}></div>
            <div align='center'>
              <RateButton {...likeButton} />
              <RateButton {...neutralButton} />
              <RateButton {...dislikeButton} />
            </div>
          </div>
        </>
      );
  }
}
