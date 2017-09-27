import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';

import { Route, Switch } from 'react-router';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import registerServiceWorker from './registerServiceWorker';

import Movie from './components/movie/movie';
import FavoriteList from './page/favoriteList';
import reducer from './reducers/index';

import './index.css';
import App from './App';

const history = createBrowserHistory();
const store = createStore(
  connectRouter(history)(reducer),
  composeWithDevTools(applyMiddleware(thunk))
   //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store} >
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" render={() => (<App/>)} />
      <Route exact path="/favorite" render={() => (<FavoriteList/>)} />
      <Route exact path="/movie/:id" render={() => (<Movie/>)} />
      <Route render={() => (<div>Miss</div>)} />
    </Switch>
  </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
 );
registerServiceWorker();
