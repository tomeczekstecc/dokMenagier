import React, { useEffect, useContext, useState } from 'react';
import CardFilm from './CardFilm';
import axios from 'axios';
import FilmContext from '../../context/film/filmContext';
import TopHeader from '../layout/partials/TopHeader';
import { useSnackbar } from 'notistack';
import { Divider } from 'antd';

import FloatingButton from '../layout/partials/FloatingButton';

const AllFilms = () => {
  const { enqueueSnackbar } = useSnackbar();
  const filmContext = useContext(FilmContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFilms();
    setLoading(false);
    //eslint-disable-next-line
  }, [loading]);

  const { films, getFilms } = filmContext;

  const handleOnClickDelete = async (id) => {
    setLoading(true);

    try {
      await axios.delete(`/api/films/${id}`).then((res) => {
        enqueueSnackbar(`${res.data.msg}`, {
          variant: `${res.data.result}`,
        });
      });
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOnClickChangeSort = async (id, direction) => {
    setLoading(true);
    console.log(loading);

    try {
      await axios.put(`/api/films/${direction}/${id}`).then((res) => {
        if (res.data.msg === undefined) {
          enqueueSnackbar(`Dokonano zmian`, {
            variant: `info`,
          });
        } else {
          enqueueSnackbar(`${res.data.msg}`, {
            variant: `${res.data.result}`,
          });
        }
      });
      setTimeout(setLoading(false), 1000);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <TopHeader title='Zarządzanie' icon='fas fa-cog' />

      <h5 style={style.h3}>INSTRUKCJE DLA OPERATORA</h5>
      <div id='type_cards_wrapper' className='animated fadeIn' style={style}>
        {films !== null
          ? films
              .filter(
                (item) =>
                  item.target === 'oper' &&
                  item.type === 'film' &&
                  !item.archived
              )
              .map((film) => (
                <CardFilm
                  handleOnClickDelete={handleOnClickDelete}
                  handleOnClickChangeSort={handleOnClickChangeSort}
                  loading={loading}
                  key={film._id}
                  film={film}
                />
              ))
          : null}
      </div>
      <Divider />
      <h5 style={style.h3}>INSTRUKCJE DLA BENEFICJENTA</h5>
      <div id='type_cards_wrapper' className='animated fadeIn' style={style}>
        {films !== null
          ? films
              .filter(
                (item) =>
                  item.target === 'ben' && item.type === 'film' && !item.archived
              )
              .map((film) => (
                <CardFilm
                  handleOnClickDelete={handleOnClickDelete}
                  handleOnClickChangeSort={handleOnClickChangeSort}
                  loading={loading}
                  key={film._id}
                  film={film}
                />
              ))
          : null}
      </div>
      <FloatingButton
        scale={1}
        text='Dodaj'
        linkTo='newfilm'
        position='fixed'
        p_marginTop='10px'
      />
    </div>
  );
};

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',

  h3: {
    margin: '30px 0px -30px 30px',
  },
};

export default AllFilms;
