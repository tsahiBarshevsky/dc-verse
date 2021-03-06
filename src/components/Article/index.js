import React, { useState, useEffect } from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider, Typography, Button } from '@material-ui/core';
import { FaFacebookF, FaFacebookMessenger, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { FacebookShareButton, FacebookMessengerShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import parse from "html-react-parser";
import { Link } from 'react-router-dom';
import LoadingAnimation from '../Loading';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar'
import ScrollToTop from '../scrollToTop';
// import Batman from '../../images/marcin-lukasik-uYpOYyJdhRE-unsplash.jpg';
import firebase from '../firebase';

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h6: { fontWeight: 600 },
        subtitle2:
        {
            color: 'white',
            fontSize: 20,
            letterSpacing: 1,
            fontWeight: 600,
            marginBottom: 20
        }
    }
});

const useStyles = makeStyles({
    facebook: { color: '#3b5999' },
    messenger: { color: '#0084ff '},
    twitter: { color: '#55acee '},
    whatsapp: { color: '#25D366 '},
    divider:
    {
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: '#88888833'
    },
    button:
    {
        color: '#ffa301',
        width: 165,
        height: 45,
        fontSize: 17,
        backgroundColor: 'transparent',
        border: '2px solid #ffa301',
        borderRadius: 25,
        transition: 'all 0.4s ease-out',
        marginTop: 30,
        zIndex: 1,
        '&:hover':
		{
            color: 'white',
			backgroundColor: '#ffa301'
		}
    }
});

export default function Article(props) 
{
    const title = props.match.params.title.replaceAll('-', ' ');
    const [post, setPost] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [fault, setFault] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen(!isOpen)};
    const classes = useStyles();

    useEffect(() => 
    {
        if (!fault)
            document.title = `DC Verse | ${title}`;
        else
            document.title = `DC Verse | ??????????`;
        firebase.getPost(title).then(setPost);
    }, [title, fault]);

    if (post && !loaded)
        setLoaded(true);

    if (post === null && !fault)
        setFault(true); 

    const renderText = () =>
    {
        var paragraphs = post.text.split('\n');
        return (
            paragraphs.map((paragraph, index) =>
                <div key={index}>
                    <Typography gutterBottom paragraph>{parse(paragraph)}</Typography>
                </div>
            )
        )
    }

    return loaded ? (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <ScrollToTop />
            <div className="post-container"> 
                <div className="title-container">
                    <div className="title-wrapper">
                        <Typography variant="h4">{post.title}</Typography>
                    </div>
                    <div className="date">
                        <p>?????????? ???????????? {new Date(post.date.seconds * 1000).toLocaleDateString("en-GB")}</p>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="post">
                        <MuiThemeProvider theme={theme}>
                            <div className="image-container">
                                <img src={post.image} alt={post.title} className="main-image" />
                                {post.credit ? <div className="credit">{post.credit}</div> : null}
                            </div>
                            <div className="share-buttons">
                                <div className="share">
                                    <IoShareSocial style={{fontSize: 20}} />
                                    <Typography variant="subtitle1">??????</Typography>
                                </div>
                                <FacebookShareButton url={window.location.href}>
                                    <div className="button">
                                        <div className="logo-container"><FaFacebookF className="logo" /></div>
                                        <div className="caption">
                                            <Typography variant="subtitle1" className={classes.facebook}>Facebook</Typography>
                                        </div>
                                    </div>
                                </FacebookShareButton>
                                <FacebookMessengerShareButton appId="472443117195729" url={window.location.href}>
                                    <div className="button">
                                        <div className="logo-container"><FaFacebookMessenger className="logo" /></div>
                                        <div className="caption">
                                            <Typography variant="subtitle1" className={classes.messenger}>Messenger</Typography>
                                        </div>
                                    </div>
                                </FacebookMessengerShareButton>
                                <TwitterShareButton url={window.location.href}>
                                    <div className="button">
                                        <div className="logo-container"><FaTwitter className="logo" /></div>
                                        <div className="caption">
                                            <Typography variant="subtitle1" className={classes.twitter}>Twitter</Typography>
                                        </div>
                                    </div>
                                </TwitterShareButton>
                                <WhatsappShareButton url={window.location.href}>
                                    <div className="button">
                                        <div className="logo-container"><FaWhatsapp className="logo" /></div>
                                        <div className="caption">
                                            <Typography variant="subtitle1" className={classes.whatsapp}>WhatsApp</Typography>
                                        </div>
                                    </div>
                                </WhatsappShareButton>
                            </div>
                            <div className="text-container">
                                {post ? renderText() : null}
                            </div>
                            {post.tags.length > 0 ?
                            <div className="tags-container">
                                <h4>??????????: </h4>
                                {post.tags.map((tag) => <Link className="tag-link" to={`/tags/${tag.replace(/\s+/g, '-')}`}>{tag}</Link>)}
                            </div> : null}
                            {/* <div className="about">
                                <div className="image-container">
                                    <img src={Batman} alt="Batman" />
                                </div>
                                <div className="about-container">
                                    <Typography variant="h6">?????? ????????</Typography>
                                    <Typography variant="body1" gutterBottom>
                                        ???????? ???????????? ?????????? ?????? ??????, ?????????????????? ?????????????????? ???????? ???????? ???????????? ?????????? ???????? ???????? ????????, ?????????? ?????????? ???? ??????, ???????????? ???????? ??????????. ?????????? ???????? ???????? ??????????, ???????????? ????????. ?????????? ?????????? ???????? ???????? ???????? - ???????? ?????????? ????????? ???????? ??????????.
                                    </Typography>
                                    <div className="social-media">
                                        <FaFacebook className="icon" />
                                        <FaInstagram className="icon" />
                                        <FaTwitter className="icon" />
                                    </div>
                                </div>
                            </div> */}
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
            <Footer origin="article" />
        </>
    )
    :
    [(!fault ?
        <LoadingAnimation text="?????? ????????..." />
        :
        <div className="fault-container">
            <MuiThemeProvider theme={theme}>
                <Typography variant="h5">?????????? ???????????? ???????? ??????????.</Typography>
                <Button component={Link}
                    to="/" variant="contained"
                    className={classes.button}>???????? ?????? ????????</Button>
            </MuiThemeProvider>
        </div>
    )]
}
