import React, { useState, useEffect} from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjThree } from './Data';
import Match from "./../../assets/Match/Match";

function Home() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
      <Section {...homeObjOne} />
      {currentTime}
      {Match}
      <Section {...homeObjThree} />
    </>
  );
}

export default Home;