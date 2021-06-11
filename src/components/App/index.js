import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.sass';
import Homepage from '../Homepage';
import Post from '../Post';
import Editor from '../Editor/add';
import EditPost from '../Editor/edit';
import Dashboard from '../Dashboard';

export default function App() 
{
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/editor" component={Editor} />
                <Route exact path="/:title" component={Post} />
                <Route exact path="/editor/:title" component={EditPost} />
            </Switch>
        </Router>
    )
}