import FIND__MOVIE from '../actions/search';
import { GET_POPULAR_MOVIES_START, GET_POPULAR_MOVIES_SUCCESS } from '../actions/movie';


const initialState = {
  showPopular: true,
  showSearch: false,
  error: false,
  fetching: false,
  movieList: [],
  favoriteList: [],
};


export default function search(state = initialState, action) {
  switch (action.type) {
    case FIND__MOVIE:
      return {
        ...state,
        showSearch: true,
        showPopular: false,
        movieList: action.payload
      }
    case GET_POPULAR_MOVIES_START:
      return {
        fetching: true,
        showSearch: false
      }
    case GET_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        showPopular: true,
        fetching: false,
        movieList: action.payload,
      }
    default:
      return state;
  }
}
