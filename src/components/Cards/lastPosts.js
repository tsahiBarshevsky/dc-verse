import React from 'react';
import { Link } from 'react-router-dom';

export default function LastPostsCard() 
{
    return (
        <div className="last-posts-card-container">
            <div className="last-posts-card-image-container">
                <img src="https://firebasestorage.googleapis.com/v0/b/dc-verse.appspot.com/o/posts%2F%D7%91%D7%93%D7%99%D7%A7%D7%94?alt=media&token=5bf4e91f-0e8a-4548-ae0b-3147c2a5761e" alt="" className="main-image" />
            </div>
            <div className="last-posts-card-information">
                <Link to={{pathname: `/`}} className="link">לורם איפסום דולור סיט אמט לורם איפסום דולור סיט אמט</Link>
                <p className="date">11/06/2021</p>
            </div>
        </div>
    )
}
