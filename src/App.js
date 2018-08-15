import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home';
import asyncComponent from './components/asyncComponent';

class App extends Component {
  render() {
    return  (
      <Router basename='/'>
        <div>
          <Route path='/' component={Home} />
          <Switch>
            <Route path='/path' exact componen={() => <div></div>} />
            <Route path='/path/:dummyComponent' exact component={asyncComponent()} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
