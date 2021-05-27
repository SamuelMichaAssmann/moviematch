import React from 'react';
import Matching from '../../assets/Matching/Matching'
import { matchingObj } from './Data'

function Section() {
  return (
    <>
      <Matching {...matchingObj} />
    </>
  );
}

export default Section;
