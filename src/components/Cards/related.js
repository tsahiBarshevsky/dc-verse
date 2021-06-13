import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedPostCard({post}) 
{
    return (
        <div className="related-posts-card-container">
            <div className="related-posts-card-image-container">
                <img src={post.image} alt={post.title} className="main-image" />
            </div>
            <div className="related-posts-card-information">
                <Link to={{pathname: `/${post.title.replace(/\s+/g, '-')}`}} className="link">{post.title}</Link>
                <div className="category-and-date">
                    <div className="category">{post.category}</div>
                    <p>{new Date(post.date.seconds * 1000).toLocaleDateString('en-GB')}</p>
                </div>
            </div>
        </div>
    )
}
