import React from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjTwo} from './Data';

function Settings() {
  return (
    <>
      <Section {...homeObjOne} />
      <Section {...homeObjTwo} />
    </>
  );
}

export default Settings;
