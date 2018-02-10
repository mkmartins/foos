import React from 'react';
import Players from './components/Players'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import About from './components/About'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/About" component={About} />
        <Route path="/" component={Players} />
      </Switch>
    </div>
  </BrowserRouter>
  ,document.getElementById('root')
);
