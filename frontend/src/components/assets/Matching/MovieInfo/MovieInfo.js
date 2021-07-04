import React from 'react';
import './MovieInfo.css';
import { AiFillStar } from 'react-icons/ai';

// The MovieInfo component renders information of a movie to the user.
// This information includes runtime, rating and genres.
function MovieInfo({
    runtime,
    rating,
    genres,
    tableExtraClasses
}) {
    return (
        <>
            <div className="movieInfo">
                <table className={`movieTable ${tableExtraClasses}`}>
                    <tbody>
                        <tr>
                            <td className="movieRow">
                                <div>
                                    <p className='movieInfoHeader'>Runtime</p>
                                    <p className='movieInfoText'>{runtime} minutes</p>
                                </div>
                            </td>
                            <td className="movieRow">
                                <div>
                                    <p className='movieInfoHeader'>Rating</p>
                                    <p className='movieInfoText'><AiFillStar /> {rating}</p>
                                </div>
                            </td>
                            <td className="movieRow">
                                <div>
                                    <p className='movieInfoHeader'>Genres</p>
                                    <p className='movieInfoText'>{genres}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MovieInfo;