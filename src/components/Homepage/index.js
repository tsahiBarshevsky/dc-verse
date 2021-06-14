import React, { useState, useEffect } from 'react';
import { Divider, makeStyles, IconButton } from '@material-ui/core';
import { Link as Scroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MainCard from '../Cards/main';
import MainArticle from '../Cards/mainArticle';
import Footer from '../Footer';
import firebase from '../firebase';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import ScrollToTop from '../scrollToTop';
import LoadingAnimation from '../Loading';
import Batman from '../../images/marcin-lukasik-uYpOYyJdhRE-unsplash.jpg';
import Logo from '../../images/logo.png';

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
            transition: 'all .2s ease-in',
            transform: 'scale(1.1)'
        }
    }
});

export default function Homepage() 
{
    const [posts, setPosts] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen(!isOpen)};
    const classes = useStyles();

    useEffect(() => 
    {
        document.title = 'DC Verse | דף הבית';
        firebase.getAllPosts().then(setPosts);
    }, []);

    const renderFourRecentArticles = () =>
    {
        var arr = [], counter = 0;
        for (var i=1; i<posts.length; i++)
        {
            if (new Date(posts[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
            {
                arr.push(<MainCard post={posts[i]} />);
                counter++;
            }
            if (counter === 4)
                break;
        }
        return (
            <div className="posts">
                <h3 className="title">כתבות אחרונות</h3>
                {arr}
            </div>);
    }

    const renderAdditionalArticles = () =>
    {
        var arr = [];
        for (var i=5; i<posts.length; i++)
        {
            if (new Date(posts[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
                arr.push(<MainCard post={posts[i]} />);
            if (i === 9)
                break;
        }
        return <div className="articles">{arr}</div>
    }

    return posts ? (
        <div className="homepage-container">
            <ScrollToTop />
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className="hero-container">
                <h1 className="title">
                    <span className="english">DC Verse - </span><span className="hebrew">חדשות ועדכונים חמים</span>
                </h1>
                <Divider className={classes.heroDivider} />
                <p className="subtitle">
                    כל החדשות והעדכונים על המולטיוורס של דיסי בקומיקס, ביקומים הטלוויזיונים והקולנועיים 
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
                {posts.length > 0 ? <MainArticle post={posts[0]} /> : null}
            </div>
            <Divider className={classes.divider} />
            <div className="main-section">
                {renderFourRecentArticles()}
                <div className="about-container">
                    <div className="about-image-container">
                        <img src={Batman} alt="Batman" className="about-image" />
                    </div>
                    <div className="logo-and-text">
                        <img src={Logo} alt="Logo" className="logo" />
                        <p className="about-text">DC Verse הוא האתר שמביא אליכם את כל החדשות והעדכונים הכי חמים הקשורים במולטיוורס של דיסי בקומיקס, ביקומים הטלוויזיונים והקולנועיים.</p>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} />
            <div className="top-articles">
                <h3 className="title">כתבות נוספות</h3>
                {renderAdditionalArticles()}
                {posts.length >= 10 ? <Link to='/archive' className="archive-link">לשאר הכתבות</Link> : null}
            </div>
            <Footer origin='homepage' />
        </div>
    ) : <LoadingAnimation text="כבר מגיע..." />
}
