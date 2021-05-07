import React from 'react';
import './Matching.css';

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
