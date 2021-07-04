import React from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjTwo, homeObjThree } from './Data';

// The Home component handles the home page of the website.
function Home() {
  return (
    <>
      { localStorage.getItem('loginState') ? <Section {...homeObjTwo} /> : <Section {...homeObjOne} /> }
      <Section {...homeObjThree} />
    </>
  );
}

export default Home;