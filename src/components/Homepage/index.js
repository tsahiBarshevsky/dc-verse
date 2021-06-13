import React, { useState, useEffect } from 'react';
import { Divider, makeStyles, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MainCard from '../Cards/main';
import MainArticle from '../Cards/mainArticle';
import Footer from '../Footer';
import Batman from '../../images/marcin-lukasik-uYpOYyJdhRE-unsplash.jpg';
import firebase from '../firebase';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const useStyles = makeStyles({
    divider:
    {
        width: '90%',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: '#88888833'
    },
    heroDivider:
    {
        width: 80,
        height: 8,
        marginTop: 20,
        marginBottom: 40,
        backgroundColor: '#ffa301'
    },
    scrollButton:
    {
        width: 45,
        height: 45,
        color: '#ffa301',
        backgroundColor: 'transparent',
        border: '2px solid #ffa301',
        transition: 'all 0.2s ease-out',
        '&:hover':
        {
            color: 'white',
            backgroundColor: '#ffa301',
            transition: 'all 0.2s ease-in'
        }
    }
});

export default function Homepage() 
{
    const [posts, setPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen(!isOpen)};
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
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className="hero-container">
                <h1 className="title">DC Verse - כל החדשות והעדכונים החמים</h1>
                <Divider className={classes.heroDivider} />
                <p className="subtitle">
                    לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.
                </p>
                <Scroll to="main-article"
                    exact='true' 
                    smooth={true} duration={1500}
                    spy={true} offset={-55}>
                    <IconButton className={classes.scrollButton}>
                        <ArrowDownwardIcon />
                    </IconButton>
                </Scroll>
            </div>
            <div className="main-article">
                {recentPosts.length > 0 ? <MainArticle post={recentPosts[0]} /> : null}
            </div>
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
                <div className="about-and-categories">
                    <div className="about">
                        <div className="about-image-container">
                        <img src={Batman} alt="Batman" className="about-image" />
                        </div>
                        <p className="about-text">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.</p>
                    </div>
                    <div className="top-categories">
                        <h3 className="title">קטגוריות מובילות</h3>
                        {categories.map((category) =>
                            <div key={category.id} className="category">
                                <Link className="link" to={{pathname: `/categories/${category.name}`}}>
                                    {category.name}
                                </Link>
                                <p>{category.occurrences}</p>
                            </div>
                        )}
                        <Link className="other-categories" to='/categories'>לכל הקטגוריות</Link>
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
            <Footer origin='homepage' />
        </div>
    )
}
