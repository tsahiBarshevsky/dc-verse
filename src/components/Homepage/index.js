import React, { useState, useEffect } from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import MainCard from '../Cards/main';
import MainArticle from '../Cards/mainArticle';
// import logo from '../../images/logo.png';
import { categories } from '../dummyInfo';
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
        firebase.getFourRecentPosts().then(setRecentPosts);
    }, []);

    return (
        <div className="homepage-container">
            <div className="hero-container">
                כל החדשות והעדכונים ביקום של DC במקום אחד
            </div>
            {recentPosts.length > 0 ? <MainArticle post={recentPosts[0]} /> : null}
            <Divider className={classes.divider} />
            <div className="content">
                <div className="posts">
                    <h3 className="title">כתבות אחרונות</h3>
                    {recentPosts.slice(1).map((post, index) =>
                        <div key={index}>
                            <MainCard post={post} />
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
