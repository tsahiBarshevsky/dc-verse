import React from 'react';
import { Link } from 'react-router-dom';

export default function MainArticle({post}) 
{
    return (
        <div className="main-article-container">
            <div className="image-container">
                <img src={post.image} alt={post.title} className="main-image" />
            </div>
            <Link to={{pathname: `/${post.title.replace(/\s+/g, '-')}`}} className="link">{post.title}</Link>
            <p>{post.preview}</p>
        </div>
    )
}
