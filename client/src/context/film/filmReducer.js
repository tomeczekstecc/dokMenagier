import {
  GET_FILMS,
  SET_CURRENT_FILM,
  SET_TRANSFER_DONE,
  SET_ALL_READY
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    case SET_CURRENT_FILM:
      return {
        ...state,
        curFilm: state.films.filter((film) => film._id === action.payload),
      };

    case SET_TRANSFER_DONE:
      return {
        ...state,
        transferDone: action.payload,
      };
    case SET_ALL_READY:
      return {
        ...state,
        allReady: action.payload,
      };

    default:
      return state;
  }
};
