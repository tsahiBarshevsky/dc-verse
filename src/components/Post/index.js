import React from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider, Typography } from '@material-ui/core';
import { FaFacebookF, FaFacebookMessenger, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { FacebookShareButton, FacebookMessengerShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { posts } from '../dummyPosts';

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Varela Round", sans-serif` }
    }
});

const useStyles = makeStyles({
    facebook: { color: '#3b5999' },
    messenger: { color: '#0084ff '},
    twitter: { color: '#55acee '},
    whatsapp: { color: '#25D366 '},
});

export default function Post() 
{
    const classes = useStyles();

    const renderText = () =>
    {
        var paragraphs = posts[0].text.split('\n');
        return (
            paragraphs.map((paragraph) =>
                <Typography gutterBottom paragraph>{paragraph}</Typography>
            )
        )
    }

    return (
        <div className="post-container">
            <MuiThemeProvider theme={theme}>
                <Typography variant="h4">{posts[0].title}</Typography>
                <div className="category-and-date">
                    <div className="category">{posts[0].category}</div>
                    <p>{posts[0].date}</p>
                </div>
                <img src={posts[0].image} alt={posts[0].title} className="main-image" />
                <div className="share-buttons">
                    <div className="share">
                        <IoShareSocial style={{fontSize: 20}} />
                        <Typography variant="subtitle1">שתף</Typography>
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
                    {renderText()}
                </div>
            </MuiThemeProvider>
        </div>
    )
}
