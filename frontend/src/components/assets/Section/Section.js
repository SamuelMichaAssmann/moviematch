import React from 'react';
import './Section.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

// The Section component renders a horizontal section containing a header, a description, a button and/or an image.
// This component is best used on informational, non-interactive parts of the website.
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
  link,
  onClick
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
                {
                  buttonLabel
                    ? (
                      link
                        ? <Link to={link}>
                          <Button buttonSize='btn--wide' buttonColor='blue' onClick={onClick}>
                            {buttonLabel}
                          </Button>
                        </Link>
                        : <Button buttonSize='btn--wide' buttonColor='blue' onClick={onClick}>
                          {buttonLabel}
                        </Button>
                    )
                    : null
                }
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
