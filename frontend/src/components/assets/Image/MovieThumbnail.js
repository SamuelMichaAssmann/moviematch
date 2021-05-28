import React from 'react';
import './MovieThumbnail.css';

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
