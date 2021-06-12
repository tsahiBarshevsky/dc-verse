import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
({
    divider:
    {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#88888833'
    },
    homepagePadding:
    {
        padding: '0 175px',
        [theme.breakpoints.down('lg')]: { padding: '0 100px' },
        [theme.breakpoints.down('sm')]: { padding: '0 25px' }
    },
    articlePadding:
    {
        padding: '0 150px',
        '@media (max-width: 1470px)': { padding: '0 100px' },
        '@media (max-width: 1350px)': { padding: '0 50px' },
        [theme.breakpoints.down('sm')]: { padding: '0 20px' }
    }
}));

export default function Footer({origin}) 
{
    const classes = useStyles();

    return (
        <footer className={origin === 'homepage' ? classes.homepagePadding : classes.articlePadding}>
            <Divider className={classes.divider} />
            <div className="copyrights">
                <p>כל הזכויות שמורות &copy; פותח ע"י צחי ברשבסקי</p>
                {new Date().getFullYear() === 2021 ? <p>DC Verse &copy; 2021</p> : <p>DC Verse &copy; 2021 - {new Date().getFullYear()}</p>}
            </div>
        </footer>
    )
}
