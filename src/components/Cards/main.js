import React from 'react';
import { Link } from 'react-router-dom';

export default function MainCard({post}) 
{
    return (
        <div className="main-card-container">
            <div className="image-container">
                <img src={post.image} alt={post.title} className="main-image" />
            </div>
            <div className="information">
                <Link to={{pathname: `/${post.title.replace(/\s+/g, '-')}`}} className="link">{post.title}</Link>
                <div className="category-and-date">
                    <div className="category">{post.category}</div>
                    <p>{new Date(post.date.seconds * 1000).toLocaleDateString('en-GB')}</p>
                </div>
                <p>{post.preview}</p>
            </div>
        </div>
    )
}

