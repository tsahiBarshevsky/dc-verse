import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Link, withRouter } from 'react-router-dom';
// import firebase from '../firebase';

function Navbar(props) 
{
    return (
        <div className="dasboard-navbar">
            <div className="dashboard-navbar-container">
                <div className="links-container">
                    <Link className="links" to='/'>
                        <HomeIcon />
                        <p className="text">מעבר לאתר</p>
                    </Link>
                    <div className="space" />
                    <Link className="links" to='/editor'>
                        <PostAddIcon />
                        <p className="text">פוסט חדש</p>
                    </Link>
                    <div className="space" />
                    <Link className="links">
                        <NoteAddIcon />
                        <p className="text">הוסף עדכון</p>
                    </Link>
                </div>
                <p className="links">
                    <ExitToAppIcon />
                    <p className="text">התנתקות</p>
                </p>
            </div>
        </div>
    )

    // async function logout() 
    // {
	// 	await firebase.logout();
	// 	props.history.push('/');
	// }
}

export default withRouter(Navbar);