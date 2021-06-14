import React, { useEffect } from 'react';
import './Match.css';
import confetti from "canvas-confetti";
import { matchingObj } from './Data';
import Matching from '../../assets/Matching/Matching';
import APIHandler from '../../manage/api/APIHandler';

function Match() {
  useEffect(() => {
    APIHandler.getRequest(matchingObj.getEndpoint, {
      "user_id": localStorage.getItem("uid"),
      "group_id": new URLSearchParams(window.location.search).get('id'),
      "path": matchingObj.dataPath
    }).then(data => {
      if (data.movie_id != "false") {
        match();
      };
    });
  }, []);
  
  const match = () => {
    confetti({
      particleCount: 300,
      spread: 360,
      startVelocity: 50,
    });

    const modal = document.querySelector(`.modal`);
    const contentWrapper = modal.querySelector(".content-wrapper");
    const close = modal.querySelector(".close");

    close.addEventListener("click", () => modal.classList.remove("open"));

    modal.addEventListener("click", () => modal.classList.remove("open"));
    contentWrapper.addEventListener("click", (e) => e.stopPropagation());
    modal.classList.toggle("open");
  }

  return (
    <>
      <div class="modal" >
        <article class="content-wrapper">
          <button class="close"></button>
          <div className="scrollview">
            <h2 className='matchheading'>You got a match!</h2>
            <Matching {...matchingObj} />
          </div>
        </article>
      </div>
    </>
  );
}

export default Match;