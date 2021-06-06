import React from 'react';
import NewsTicker from 'react-advanced-news-ticker';
import { posts } from '../demmyPosts';

export default function Homepage() 
{
    return (
        <div className="homepage-container">
            <div className="hero-container"></div>
            <NewsTicker 
                maxRows={1} 
                rowHeight={35}
                speed={1000}
                className="ticker">
                {posts.map((post) =>
                    <div key={post.id}>
                        <h2>{post.date} | {post.title}</h2>
                    </div>
                )}
            </NewsTicker>
        </div>
    )
}


