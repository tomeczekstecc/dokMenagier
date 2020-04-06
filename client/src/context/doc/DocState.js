import React, { useReducer } from 'react';
import DocContext from './docContext';
import docReducer from './docReducer';
import {
  GET_DOCS,
  SET_CURRENT_DOC,
  SET_TRANSFER_DONE,
  SET_ALL_READY,
} from '../types';
import axios from 'axios';

const DocState = (props) => {
  const initialState = {
    docs: null,
    files: [],
    curDoc: null,
    transferDone: false,
    allReady: false
  };

  const [state, dispatch] = useReducer(docReducer, initialState);

  const getDocs = async () => {
    try {
      const res = await axios.get('/api/docs');
      dispatch({
        type: GET_DOCS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurDoc = (id) => {
    dispatch({
      type: SET_CURRENT_DOC,
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
    <DocContext.Provider
      value={{
        docs: state.docs,
        getDocs,
        setCurDoc,
        setTransferDone,
        setAllReady,
        allReady: state.allReady,
        transferDone: state.transferDone,
        files: state.files,
        curDoc: state.curDoc,
      }}
    >
      {props.children}
    </DocContext.Provider>
  );
};

export default DocState;
