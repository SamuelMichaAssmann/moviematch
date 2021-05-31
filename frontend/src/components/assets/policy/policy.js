import React from 'react';

function scroll() {
    var elmnt = document.getElementById("box");
    elmnt.scrollIntoView();
  }

function Section() {
    scroll();
    return (
        <>
            <div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div id="tag1">
                    <p>Linked to here</p>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div id="tag2">
                    <p>Linked to here</p>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div id="box">
                    <p>Linked to here</p>
                </div>
            </div>
        </>
    );
}

export default Section;
