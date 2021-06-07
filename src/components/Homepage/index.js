import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import NewsTicker from 'react-advanced-news-ticker';
import Card from '../Card';
import { posts, updates } from '../dummyPosts';

const useStyles = makeStyles({
    divider:
    {
        width: '100%',
        marginBottom: 40,
        backgroundColor: '#88888833'
    }
});

export default function Homepage() 
{
    const classes = useStyles();

    return (
        <div className="homepage-container">
            <div className="hero-container"></div>
            <div className="content">
                <NewsTicker 
                    maxRows={1} 
                    rowHeight={35}
                    speed={1000}
                    className="ticker">
                    {updates.map((update) =>
                        <div key={update.id}>
                            <h2>{update.date} | {update.content}</h2>
                        </div>
                    )}
                </NewsTicker>
                <Divider className={classes.divider} />
                {posts.map((post) =>
                    <div key={post.id}>
                        <Card post={post} />
                    </div>
                )}
                <Divider className={classes.divider} />
            </div>
        </div>
    )
}


