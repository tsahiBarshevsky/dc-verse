import React, { useState, useEffect } from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import NewsTicker from 'react-advanced-news-ticker';
// import InstagramFeed from 'react-ig-feed';
// import 'react-ig-feed/dist/index.css';
import Card from '../Card';
import logo from '../../images/logo.png';
import { updates, categories } from '../dummyInfo';
import firebase from '../firebase';

const useStyles = makeStyles({
    divider:
    {
        width: '90%',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: '#88888833'
    }
});

export default function Homepage() 
{
    const [recentPosts, setRecentPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        firebase.getRecentPosts().then(setRecentPosts);
    }, []);

    return (
        <div className="homepage-container">
            <div className="hero-container">
                <div className="dummy-navbar">
                    <img src={logo} alt="" />
                </div>
            </div>
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
            <div className="content">
                <div className="posts">
                    <h3 className="title">פוסטים אחרונים</h3>
                    {recentPosts.map((post, index) =>
                        <div key={index}>
                            <Card post={post} />
                        </div>
                    )}
                </div>
                <div className="about">
                    <img src="https://images.pexels.com/photos/2304123/pexels-photo-2304123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="about-image" />
                    <p className="about-text">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.</p>
                    <div className="top-categories">
                        <h3 className="title">קטגוריות מובילות</h3>
                        {categories.map((category) =>
                            <div key={category.id} className="category">
                                <p>{category.name}</p>
                                <p>{category.count}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} />
        </div>
    )
}


