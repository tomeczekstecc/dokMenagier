import { SET_USER, LOGOUT_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: '' };

    default:
      return state;
  }
};
