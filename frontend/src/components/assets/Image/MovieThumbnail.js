import React from 'react';
import './MovieThumbnail.css';

// The MovieThumbnail component renders the thumbnail (poster preview) for a movie.
export const MovieThumbnail = ({
  src,
  height
}) => {

  return (
    <div className={'movieThumbnail'}>
      <img src={src} height={height} alt=''></img>
    </div>
  );
};
