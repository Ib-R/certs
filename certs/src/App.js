import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './components/navbar';
import Add from './components/admin/Add';
import Show from './components/admin/Show';
import Edit from './components/admin/Edit';
import Search from './components/Search';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route component={Nav}/>
          <header className="App-header mb-3">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Switch>
            <Route exact path="/" component={Add}/>
            <Route exact path="/show" component={Show}/>
            <Route exact path="/edit" component={Edit}/>
            <Route exact path="/search" component={Search}/>
          </Switch>
        </div>
      </Router> 

    );
  }
}

export default App;
