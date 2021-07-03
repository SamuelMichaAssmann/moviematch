import React, { useState } from 'react';
import './Footer.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

function Footer() {
  const [mail, setMail] = useState('');
  const handleChange = () => {
    setMail('');
    console.log(mail)
  };
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join our exclusive membership to receive the latest news and trends
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
              onChange={event => setMail(event.target.value)}
            />
            <Button 
              buttonStyle='btn--outline'
              onClick={handleChange}>
                Subscribe
            </Button>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/terms' onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <a href="https://www.instagram.com/matchyourmovie/">Instagram</a>
            <a href="https://www.facebook.com/people/Match-Movie/100068724393362/">Facebook</a>
            <a href="https://www.youtube.com/channel/UCVB_N3hFg8liomWd5gbFsTw">Youtube</a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <img src="images/logo.svg" className='navbar-logo-svg' alt='MM' />
              MovieMatch
            </Link>
          </div>
          <small className='website-rights'>MovieMatch © 2021</small>
          <div className='social-icons'>
            <a className='social-icon-link' href="https://www.facebook.com/people/Match-Movie/100068724393362/"><FaFacebook /></a>
            <a className='social-icon-link' href="https://www.instagram.com/matchyourmovie/"><FaInstagram /></a>
            <a className='social-icon-link' href="https://www.youtube.com/channel/UCVB_N3hFg8liomWd5gbFsTw"><FaYoutube /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
