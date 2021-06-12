import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    divider:
    {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#88888833'
    }
});

export default function Footer() 
{
    const classes = useStyles();

    return (
        <footer>
            <div className="social-media-container">
                <div className="social-media">
                    <div className="social-media-box">
                        <FaFacebookF className="icon" />
                    </div>
                    <a href="/" target="_blank" className="link">פייסבוק</a>
                </div>
                <div className="social-media">
                    <div className="social-media-box">
                        <FaInstagram className="icon" />
                    </div>
                    <a href="/" target="_blank" className="link">אינסטגרם</a>
                </div>
                <div className="social-media">
                    <div className="social-media-box">
                        <FaTwitter className="icon" />
                    </div>
                    <a href="/" target="_blank" className="link">טוויטר</a>
                </div>
            </div>
            <div className="p100">
                <Divider className={classes.divider} />
                <div className="copyrights">
                    <p>כל הזכויות שמורות &copy; פותח ע"י צחי ברשבסקי</p>
                    {new Date().getFullYear() === 2021 ? <p>DC Verse 2021</p> : <p>DC Verse 2021 - {new Date().getFullYear()}</p>}
                </div>
            </div>
        </footer>
    )
}
