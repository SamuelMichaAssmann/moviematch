import React, { useState } from 'react';
import { Button } from '../../assets/Button/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import './Navbar.css';
import firebase from "firebase/app";
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function Navbar() {

  var user = firebase.auth().currentUser;
  const isLoggedIn = false;
  if ( user != null){
    const isLoggedIn = true;
  }
  
  const [click, setClick] = useState(false);
  const [button] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>

            <Link
              to='/'
              className='navbar-logo'
              onClick={closeMobileMenu}>
              <img
                src="images/logo.svg"
                className='navbar-logo-svg' />

              MovieMatch
            </Link>
            <div
              className='menu-icon'
              onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>

              {isLoggedIn ? <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-links'
                  onClick={closeMobileMenu}>

                  Home
                </Link>
              </li> : ""}

              {isLoggedIn ? <li className='nav-item'>
                <Link
                  to='/match'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Matching
                </Link>
              </li> : ""}

              {isLoggedIn ? <li className='nav-item'>
                <Link
                  to='/groups'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Groups
                </Link>
              </li> : ""}

              {isLoggedIn || true ? <li className='nav-item'>
                <Link
                  to='/settings'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Settings
                </Link>
              </li> : ""}

              <li className='nav-btn'>
                {button ? (
                  <Link
                    to={isLoggedIn ? '/logout' : '/sign-up'}
                    className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'>
                      {isLoggedIn ? "LOGOUT" : "SIGN UP"}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to={isLoggedIn ? '/logout' : '/sign-up'}
                    className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      {isLoggedIn ? "LOGOUT" : "SIGN UP"}
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default observer(Navbar);
