import React from 'react';

export default function Card({post}) 
{
    return (
        <div className="card-container">
            <img src={post.image} alt={post.title} />
            <div className="information">
                <h2>{post.title}</h2>
                <div className="category-and-date">
                    <div className="category">{post.category}</div>
                    <p>{post.date}</p>
                </div>
                <p>{post.text}</p>
            </div>
        </div>
    )
}

