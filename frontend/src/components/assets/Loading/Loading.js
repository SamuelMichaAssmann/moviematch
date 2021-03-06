import React from 'react';
import './Loading.css';

// The Loading component renders a visually complex loading symbol.
function Loading() {

    return (
        <>
            <div className="load">
                <div className="e-loadholder">
                    <div className="m-loader">
                        <span className="e-text">Loading</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loading;