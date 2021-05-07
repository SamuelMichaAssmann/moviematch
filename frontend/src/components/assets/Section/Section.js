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
  buttonLabel,
  img,
  alt,
  imgStart,
  link
}) {
  return (
    <>
      <div
        className={lightBg ? 'home__sek-section' : 'home__sek-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__sek-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__sek-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__sek-subtitle'
                      : 'home__sek-subtitle dark'
                  }
                >
                  {description}
                </p>
                <Link to={link}>
                  <Button buttonSize='btn--wide' buttonColor='blue'>
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__sek-img-wrapper'>
                <img src={img} alt={alt} className='home__sek-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section;
