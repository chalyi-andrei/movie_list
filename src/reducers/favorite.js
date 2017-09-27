import { SHOW_RECOMENDATIONS_MOVIES } from '../actions/movie';

const initialState = {
  showFavorite: false,
  movieList: [],
  recomendationsList: [],
};


export default function favorite(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FAVORITE_MOVIES':
      let isNew = true;

      state.movieList.forEach(function(item) {
        if (item.id == action.payload.id) {
          isNew = false;
        }
      });
      if (isNew) {
        return {
          ...state,
          showFavorite: true,
          movieList: [
            ...state.movieList,
            action.payload
          ]
        }
      } else {
        return state;
      }
    case SHOW_RECOMENDATIONS_MOVIES:
      return {
        ...state,
        recomendationsList: action.payload
      }
    default:
      return state;
  }
}
