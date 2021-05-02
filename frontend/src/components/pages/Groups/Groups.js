import React from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjThree } from './Data';
import Pricing from '../Pricing/Pricing';

function Groups() {
  return (
    <>
      <Section {...homeObjThree} />
      <Section {...homeObjOne} />
      <Section {...homeObjOne} />
      <Section {...homeObjOne} />
      <Pricing />
    </>
  );
}

export default Groups;
