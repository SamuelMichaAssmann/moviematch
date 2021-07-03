import React, { useEffect } from 'react';
import './Match.css';
import confetti from "canvas-confetti";
import { MovieThumbnail } from '../Image/MovieThumbnail';
import MovieInfo from '../Matching/MovieInfo/MovieInfo';

function Match({
  title,
  movie_id,
  desc,
  runtime,
  rating,
  genres,
  thumbnailSrc
}, onclick
) {
  confetti({
    particleCount: 300,
    spread: 360,
    startVelocity: 50,
  });

  //const modal = document.querySelector(`.modal`);
  // const contentWrapper = modal.querySelector(".content-wrapper");
  // const close = modal.querySelector(".close");

  // close.addEventListener("click", () => modal.classList.remove("open"));
  //modal.addEventListener("click", () => modal.classList.remove("open"));
  // contentWrapper.addEventListener("click", (e) => e.stopPropagation());
  //modal.classList.toggle("open");

  return (
    <>
      <div class="modal" >
        <article class="content-wrapper">
          <button class="close" onclick={onclick}></button>
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
    </>
  );
}

export default Match;