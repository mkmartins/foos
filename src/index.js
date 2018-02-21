import React from 'react';
import Players from './components/Players'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Header from './Header'
import About from './containers/About'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware()(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/About" component={About} />
          <Route path="/" component={Players} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
