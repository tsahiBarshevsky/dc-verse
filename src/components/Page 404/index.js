import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Image from '../../images/yulia-matvienko-kgz9vsP5JCU-unsplash.jpg';

const useStyles = makeStyles({
    button:
    {
        zIndex: 1,
        width: 150,
        height: 45,
        color: '#ffa301',
        fontSize: 15,
        backgroundColor: 'transparent',
        borderRadius: 25,
        border: '2px solid #ffa301',
        transition: 'all 0.2s ease-out',
        marginTop: 10,
        '&:hover':
        {
            color: 'white',
            backgroundColor: '#ffa301',
            transition: 'all 0.2s ease-in'
        }
    }
})

export default function Page404() 
{
    const classes = useStyles();

    return (
        <div className="page-404-container">
            <h1 className="title">- 404 -</h1>
            <h2 className="subtitle">וואו 🥴 הגעת ליקום שאינו קיים</h2>
            <img src={Image} alt="" />
            <Button component={Link} to='/' className={classes.button}>חזרה ליקום שלנו</Button>
        </div>
    )
}
