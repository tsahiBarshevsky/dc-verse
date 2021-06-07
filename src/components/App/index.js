import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.sass';
import Homepage from '../Homepage';
import Post from '../Post';

export default function App() 
{
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/post" component={Post} />
            </Switch>
        </Router>
    )
}