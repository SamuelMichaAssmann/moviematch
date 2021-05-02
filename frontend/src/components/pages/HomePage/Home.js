import React from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../Pricing/Pricing';

function Home() {
  return (
    <>
      <p>My Token test = {window.token}</p>
      <Section {...homeObjOne} />
      <Section {...homeObjThree} />
      <Section {...homeObjTwo} />
      <Pricing />
      <Section {...homeObjFour} />
    </>
  );
}

export default Home;
