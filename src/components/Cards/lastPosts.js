import React from 'react';
import { Link } from 'react-router-dom';

export default function LastPostsCard({post}) 
{
    return (
        <div className="last-posts-card-container">
            <div className="last-posts-card-image-container">
                <img src={post.image} alt={post.title} className="main-image" />
            </div>
            <div className="last-posts-card-information">
                <Link to={{pathname: `/`}} className="link">{post.title}</Link>
                <p className="date">{new Date(post.date.seconds * 1000).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
    )
}
