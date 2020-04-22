import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './containers/login/login'
import Admin from './containers/admin/admin'
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/admin' component={Admin} />
          <Route path='/login' component={Login} />
          <Redirect to='login' />
        </Switch>
      </Router>
    )
  }
}
