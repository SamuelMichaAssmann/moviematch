import React from 'react';
import Section from '../../assets/Section/Section';
import { Textfield } from '../../assets/Textfield/Textfield';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../Pricing/Pricing';

function Home() {
  return (
    <>
      <Section {...homeObjOne} />
      <Section {...homeObjThree} />
      <Section {...homeObjTwo} />
      <Pricing />
      <Section {...homeObjFour} />
    </>
  );
}

export default Home;
