import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { Button, IconButton, Tooltip, Typography, DialogActions } from '@material-ui/core';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import { ToastContainer, toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';
import PostsTable from './table';
import Navbar from './navbar';
import LoadingAnimation from '../Loading';

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
    },
    cancel:
	{
		color: '#263238',
		width: 85,
		height: 40,
		fontSize: 16,
        fontWeight: 600,
		border: '2px solid #263238',
		backgroundColor: 'transparent',
		borderRadius: 25,
		transition: 'all 0.2s ease-out',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#263238',
			transition: 'all 0.2s ease-in'
		}
	},
	delete: 
	{
		width: 85,
		color: 'white',
		fontSize: 16,
		fontWeight: 600,
		border: '2px solid #263238',
		backgroundColor: '#263238',
		borderRadius: 25,
		margin: 10,
		'&:hover':
		{
			color: '#263238',
			backgroundColor: 'transparent',
		}
	}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h5: { textDecoration: 'none', fontWeight: 600, letterSpacing: 2 },
        subtitle1: { fontWeight: 'bold' },
        subtitle2: { fontSize: 15 },
        body1: { marginBottom: 10 },
        caption: { fontSize: 18 }
	}
});

function Dashboard(props) 
{
    const [posts, setPosts] = useState('');
    const [title, setTitle] = useState('');
    const [update, setUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const dialogBackground = {backgroundColor: '#f5f5f5'};
    const warningStyle = {
        fontSize: 30,
        color: '#263238',
        marginLeft: 10,
    }

    useEffect(() => 
    {
        document.title = `DC Verse | ????????????`;
        async function buildPostsTable()
        {
            console.log("buildPostsTable called");
            var arr = [];
            firebase.db.collection('posts').get().then((querySnapshot) =>
            {
                querySnapshot.forEach((doc) => 
                {
                    arr.push({
                        title: doc.data().title,
                        date: new Date(doc.data().date.seconds * 1000).toLocaleDateString("en-GB"),
                        buttons: 
                        <>
                            <Tooltip title={<h2 style={{fontWeight: 100}}>??????????</h2>} placement="left" arrow>
                                <span>
                                    <IconButton component={Link}
                                        className={classes.actionButton}
                                        to={{pathname: `/editor/${doc.data().title.replace(/\s+/g, '-')}`}}>
                                        <EditRoundedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title={<h2 style={{fontWeight: 100}}>??????????</h2>} placement="left" arrow>
                                <span>
                                    <IconButton 
                                        component={Link}
                                        to={{pathname: `/${doc.data().title.replace(/\s+/g, '-')}`}}
                                        className={classes.actionButton}>
                                        <VisibilityRoundedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title={<h2 style={{fontWeight: 100}}>??????????</h2>} placement="left" arrow>
                                <span>
                                    <IconButton className={classes.actionButton}
                                        onClick={() => {setTitle(doc.data().title); handleOpen();}}>
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
        if (update)
        {
            buildPostsTable();
            setUpdate(false);
        }
    }, [update, classes.actionButton]);

    if (!firebase.getCurrentUsername()) 
    {
		props.history.replace('/admin');
		return null;
	}

    const handleOpen = () =>
	{
		setOpen(true);
	}

    const handleClose = () =>
	{
        setOpen(false);
    }

    const notify = (type, message) =>
    {
        switch (type)
        {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default: return null;
        }
    }

    return posts ? (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="table-container">
                    <PostsTable posts={posts} />
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{cursor: "default", borderRadius: 25}}>
                    <DialogTitle style={dialogBackground}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <WarningIcon style={warningStyle} />
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="h5">
                                    {`?????????? ????????`}
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </DialogTitle>
                    <DialogContent style={dialogBackground}>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="caption" gutterBottom>
                                {`??????, ???????? ???????? ???????? ?????????? ???? ?????????? ${title}?`}
                            </Typography>
                        </MuiThemeProvider>
                    </DialogContent>
                    <DialogActions style={dialogBackground}>
                        <Button onClick={handleClose} className={classes.delete}>??????????</Button>
                        <Button onClick={deletePost} className={classes.cancel}>??????????</Button>
                    </DialogActions>
            </Dialog>
            <ToastContainer
                position="bottom-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    ) : <LoadingAnimation text="???????? ????????????..." />

    async function deletePost()
    {
        setOpen(false);
        await firebase.deletePost(title);
        setUpdate(true);
        notify("success", `${title} ???????? ????????????`);
    }
}

export default withRouter(Dashboard);
