import {
  GET_DOCS,
  SET_COVER,
  SET_CURRENT_DOC,
  SET_TRANSFER_DONE,
  SET_ALL_READY
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DOCS:
      return {
        ...state,
        docs: action.payload,
      };
    case SET_CURRENT_DOC:
      return {
        ...state,
        curDoc: state.docs.filter((doc) => doc._id === action.payload),
      };

    case SET_COVER:
      return {
        ...state,
        files: action.payload[0],
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
