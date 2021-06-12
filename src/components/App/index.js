import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.sass';
import LoadingAnimation from '../Loading';
import firebase from '../firebase';
import Homepage from '../Homepage';
import Article from '../Article';
import Editor from '../Editor/add';
import EditPost from '../Editor/edit';
import Dashboard from '../Dashboard';
import Admin from '../Admin';

export default function App() 
{
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		});
	});

    return firebaseInitialized !== false ? (
        <Router>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/editor" component={Editor} />
                <Route exact path="/:title" component={Article} />
                <Route exact path="/editor/:title" component={EditPost} />
            </Switch>
        </Router>
    ) : <LoadingAnimation text="כבר מגיע..." />
}