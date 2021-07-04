import React, { useState } from 'react';
import './Match.css';
import confetti from "canvas-confetti";
import { MovieThumbnail } from '../Image/MovieThumbnail';
import MovieInfo from '../Matching/MovieInfo/MovieInfo';

function Match({
  title,
  desc,
  runtime,
  rating,
  genres,
  thumbnailSrc,
  onClick,
}) {
  console.log(title);
  confetti({
    particleCount: 300,
    spread: 360,
    startVelocity: 50,
  });

  return (
    <div class="modal open" >
      <article class="content-wrapper">
        <button class="close" onClick={onClick}></button>
        <div className="scrollview">
          <h2 className='matchheading'>You got a match!</h2>
          <div className='movieThumbnailRow movieThumbnailRowGroup'>
            <MovieThumbnail
              src={thumbnailSrc}
              height="400"
            />
            <div>
              <h2 className='lightmovieTitle'>{title}</h2>
              <p className='home__sek-subtitle lightmovieDescription'>{desc}</p>
            </div>
          </div>
          <MovieInfo {... {
            runtime: runtime,
            rating: rating,
            genres: genres,
            tableExtraClasses: 'movieTableGroup',
          }} />
        </div>
      </article>
    </div>
  );
};

export default Match;