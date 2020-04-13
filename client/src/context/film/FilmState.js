import React, { useReducer } from 'react';
import FilmContext from './filmContext';
import filmReducer from './filmReducer';
import {
  GET_FILMS,
  SET_CURRENT_FILM,
  SET_TRANSFER_DONE,
  SET_ALL_READY,
} from '../types';
import axios from 'axios';

const FilmState = (props) => {
  const initialState = {
    films: null,
    curFilm: null,
    transferDone: false,
    allReady: false
  };

  const [state, dispatch] = useReducer(filmReducer, initialState);

  const getFilms = async () => {
    try {
      const res = await axios.get('/api/films');
      dispatch({
        type: GET_FILMS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurFilm = (id) => {
    dispatch({
      type: SET_CURRENT_FILM,
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
    <FilmContext.Provider
      value={{
        films: state.films,
        getFilms,
        setCurFilm,
        setTransferDone,
        setAllReady,
        allReady: state.allReady,
        transferDone: state.transferDone,
        curFilm: state.curFilm,
      }}
    >
      {props.children}
    </FilmContext.Provider>
  );
};

export default FilmState;
