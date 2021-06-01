import React from 'react';
import './Section.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Section({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  predescription
}) {
  return (
    <>
      <div
        className={lightBg ? 'home__sek-section' : 'home__sek-section darkBg'}>
        <div className='container'>
          <div className='top-line'>{topLine}</div>
          <h1 className={lightText ? 'heading' : 'heading dark'}>
            {headline}
          </h1>
          <p
            className={
              lightTextDesc
                ? 'home__sek-subtitletext'
                : 'home__sek-subtitletext dark'
            }>
            {predescription}
            <br></br>
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default Section;
