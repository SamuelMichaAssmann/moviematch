import React from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjTwo, homeObjThree } from './Data';

function Home() {
  return (
    <>
      { localStorage.getItem('loginState') ? <Section {...homeObjTwo} /> : <Section {...homeObjOne} /> }
      <Section {...homeObjThree} />
    </>
  );
}

export default Home;