import {
  GET_PDFS,
  SET_COVER,
  SET_CURRENT_PDF,
  SET_TRANSFER_DONE,
  SET_ALL_READY
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PDFS:
      return {
        ...state,
        pdfs: action.payload,
      };
    case SET_CURRENT_PDF:
      return {
        ...state,
        curPdf: state.pdfs.filter((pdf) => pdf._id === action.payload),
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
