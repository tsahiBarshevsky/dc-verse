import React from 'react';
import ClockLoader from "react-spinners/ClockLoader";

export default function LoadingAnimation({text}) 
{
    return (
        <div className="loading-container">
            <ClockLoader color="#ffffff" size={85} />
            <h2 className="text">{text}</h2>
        </div>
    )
}
