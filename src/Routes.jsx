import React from 'react'
import {Router, Route, Switch} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './containers/Home'

const history = createBrowserHistory()

const router = App => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Home}/>
            {/*<Route path="/add" exact component={Add}/>*/}
            {/*<Route path="/show/:time" exact component={Show}/>*/}
        </Switch>
    </Router>
)

export default router
