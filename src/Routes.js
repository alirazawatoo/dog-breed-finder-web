import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './components/Home'
import SavedDogs from './components/SavedDogs'

const history = createBrowserHistory()

export default function Routes() {

    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/'
                    component={(props) => <Home {...props} {...props.location.state} />}
                />
                <Route exact path='/saved-dogs'
                    component={(props) => <SavedDogs {...props} {...props.location.state} />}
                />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}
