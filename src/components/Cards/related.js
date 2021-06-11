import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedPostCard() 
{
    return (
        <div className="related-posts-card-container">
            <div className="related-posts-card-image-container">
                <img src="https://images.pexels.com/photos/8051944/pexels-photo-8051944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="main-image" />
            </div>
            <div className="related-posts-card-information">
                <Link to={{pathname: `/`}} className="link">לורם איפסום</Link>
                <div className="category-and-date">
                    <div className="category">קטגוריה</div>
                    <p>11/06/2021</p>
                </div>
            </div>
        </div>
    )
}
