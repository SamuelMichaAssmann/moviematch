import React, { useState, useEffect } from 'react';
import Section from '../../assets/Section/Section';
import { homeObjOne, homeObjTwo, homeObjThree } from './Data';

function Home() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
      { localStorage.getItem('loginState') ? <Section {...homeObjTwo} /> : <Section {...homeObjOne} /> }
      <Section {...homeObjThree} />
    </>
  );
}

export default Home;