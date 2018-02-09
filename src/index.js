import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import Header from './Header';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

class Hello extends React.Component {
  render() {return <div>Hello World!</div>}
}

class GoodBye extends React.Component {
  render() {return <div>Good Bye World!</div>}
}


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <Route path="/" component={App} />
      <Route path="/hello" component={Hello} />
      <Route path="/goodbye" component={GoodBye} />
    </div>
  </BrowserRouter>
  ,document.getElementById('root')
);
