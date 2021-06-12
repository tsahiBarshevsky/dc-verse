import React, { useState, useEffect } from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MainCard from '../Cards/main';
import MainArticle from '../Cards/mainArticle';
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
    const [posts, setPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const classes = useStyles();

    useEffect(() => 
    {
        firebase.getAllPosts().then(setPosts);
        firebase.getFourRecentPosts().then(setRecentPosts);
        firebase.categoriesDistribution().then(setCategories);
    }, []);

    function renderPostsByCategory(category)
    {
        var arr = [], counter = 0;
        var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<sorted.length; i++) 
        {
            if (sorted[i].category === category && new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
            {
                arr.push(<MainCard post={sorted[i]} />);
                counter++;
            }
            if (counter === 3)
                break;
        }
        return (
            <>
                <div className="category-title">
                    <h3>{category}</h3>
                    {counter === 3 ?
                    <Link className="link" to={{pathname: `/categories/${category}`}}>
                        עוד ב{category}
                    </Link> : null}
                </div>
                <div style={{paddingBottom: 25}}>{arr}</div>
            </>
        )
    }

    return (
        <div className="homepage-container">
            <div className="hero-container">
                כל החדשות והעדכונים ביקום של DC במקום אחד
            </div>
            {recentPosts.length > 0 ? <MainArticle post={recentPosts[0]} /> : null}
            <Divider className={classes.divider} />
            <div className="main-section">
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
                                <p>{category.occurrences}</p>
                            </div>
                        )}
                        <h6>לכל הקטגוריות</h6>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} />
            <div className="top-articles">
                <h3 className="title">כתבות מובילות</h3>
                <div className="articles">
                    {categories.map((category, index) =>
                        <div key={index}>
                            {renderPostsByCategory(category.name)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
