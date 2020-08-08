import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './Login/index';
import Dashboard from './Login/dashboard';

class App extends React.Component {
  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
