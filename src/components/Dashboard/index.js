import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import PostsTable from './table';
import Navbar from './navbar';

const useStyles = makeStyles({
    actionButton:
    {
        width: 37,
        height: 37,
        marginRight: 10,
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

function Dashboard() 
{
    const [posts, setPosts] = useState('');
    const classes = useStyles();

    useEffect(() => 
    {
        document.title = `DC Verse | דבשורד`;
        buildPostsTable();
    }, []);

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="table-container">
                    <PostsTable posts={posts} />
                </div>
            </div>
        </>
    )

    async function buildPostsTable()
    {
        var arr = [];
        firebase.db.collection('posts').get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) => 
            {
                arr.push({
                    title: doc.data().title,
                    category: doc.data().category,
                    date: new Date(doc.data().date.seconds * 1000).toLocaleDateString("en-GB"),
                    buttons: 
                    <>
                        <Tooltip title={<h3 style={{fontWeight: 100}}>עריכה</h3>} placement="left" arrow>
                            <span>
                                <IconButton className={classes.actionButton}>
                                    <EditRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title={<h3 style={{fontWeight: 100}}>צפייה</h3>} placement="left" arrow>
                            <span>
                                <IconButton className={classes.actionButton}>
                                    <VisibilityRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title={<h3 style={{fontWeight: 100}}>מחיקה</h3>} placement="left" arrow>
                            <span>
                                <IconButton className={classes.actionButton}>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </>
                });
            });
            setPosts(arr);
        });
    }
}

export default Dashboard;
