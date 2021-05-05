import React, { useState, useEffect} from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../Pricing/Pricing';

function Home() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
    {currentTime}
      <Section {...homeObjOne} />
      <Section {...homeObjThree} />
      <Section {...homeObjTwo} />
      <Pricing />
      <Section {...homeObjFour} />
    </>
  );
}

export default Home;
