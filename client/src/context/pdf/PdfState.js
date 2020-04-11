import React, { useReducer } from 'react';
import PdfContext from './pdfContext';
import pdfReducer from './pdfReducer';
import {
  GET_PDFS,
  SET_CURRENT_PDF,
  SET_TRANSFER_DONE,
  SET_ALL_READY,
} from '../types';
import axios from 'axios';

const PdfState = (props) => {
  const initialState = {
    pdfs: null,
    files: [],
    curPdf: null,
    transferDone: false,
    allReady: false
  };

  const [state, dispatch] = useReducer(pdfReducer, initialState);

  const getPdfs = async () => {
    try {
      const res = await axios.get('/api/pdfs');
      dispatch({
        type: GET_PDFS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurPdf = (id) => {
    dispatch({
      type: SET_CURRENT_PDF,
      payload: id,
    });
  };
  const setTransferDone = (isDone) => {
    dispatch({
      type: SET_TRANSFER_DONE,
      payload: isDone,
    });
  };
  const setAllReady = (isAllReady) => {
    dispatch({
      type: SET_ALL_READY,
      payload: isAllReady,
    });
  };

  return (
    <PdfContext.Provider
      value={{
        pdfs: state.pdfs,
        getPdfs,
        setCurPdf,
        setTransferDone,
        setAllReady,
        allReady: state.allReady,
        transferDone: state.transferDone,
        files: state.files,
        curPdf: state.curPdf,
      }}
    >
      {props.children}
    </PdfContext.Provider>
  );
};

export default PdfState;
