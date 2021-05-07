import React from 'react';
import './Loading.css';

function Loading() {

    return(
        <>
            <div class="e-loadholder">
                <div class="m-loader">
                    <span class="e-text">Loading</span>
                </div>
            </div>
            <div id="particleCanvas-Blue"></div>
            <div id="particleCanvas-White"></div>
        </>
    );
}

export default Loading;