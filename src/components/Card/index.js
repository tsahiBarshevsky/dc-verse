import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({post}) 
{
    return (
        <div className="card-container">
            <img src={post.image} alt={post.title} />
            <div className="information">
                <Link to='/post' className="link">{post.title}</Link>
                <div className="category-and-date">
                    <div className="category">{post.category}</div>
                    <p>{post.date}</p>
                </div>
                <p>{post.text}</p>
            </div>
        </div>
    )
}

