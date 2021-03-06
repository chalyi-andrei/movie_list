import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './search';
import favorite from './favorite';

export default combineReducers({
  routing: routerReducer,
  search,
  favorite
});
