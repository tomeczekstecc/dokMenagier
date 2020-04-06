import React, { useEffect, useContext, useState } from 'react';
import CardAnt from './CardAnt';
import axios from 'axios';
import DocContext from '../../context/doc/docContext';
import TopHeader from '../layout/partials/TopHeader';
import { useSnackbar } from 'notistack';

const AllCards = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const docContext = useContext(DocContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs();
    setLoading(false);
    //eslint-disable-next-line
  }, [loading]);

  const { docs, getDocs } = docContext;

  const handleOnClickDelete = async (id) => {
    setLoading(true);

    try {
      await axios.delete(`/api/docs/${id}`).then((res) => {
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
      await axios.put(`/api/docs/${direction}/${id}`).then((res) => {
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
      <TopHeader title='Wszystkie dokumenty' />
      <div style={style}>
        {docs !== null
          ? docs
              .filter((item) => item.target === 'oper' && !item.archived)
              .map((doc) => (
                <CardAnt
                  handleOnClickDelete={handleOnClickDelete}
                  handleOnClickChangeSort={handleOnClickChangeSort}
                  loading={loading}
                  key={doc._id}
                  doc={doc}
                />
              ))
          : null}
      </div>
      <div
        style={{
          height: '1px',
          borderTop: '3px solid #474b52',
          margin: '35px',
          borderRadius: '1px',
        }}
      ></div>

      <div style={style}>
        {docs !== null
          ? docs
              .filter((item) => item.target === 'ben' && !item.archived)
              .map((doc) => (
                <CardAnt
                  handleOnClickDelete={handleOnClickDelete}
                  handleOnClickChangeSort={handleOnClickChangeSort}
                  loading={loading}
                  key={doc._id}
                  doc={doc}
                />
              ))
          : null}
      </div>
    </div>
  );
};

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

export default AllCards;
