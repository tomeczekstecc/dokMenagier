import React, { useEffect, useContext, useState } from 'react';
import CardAnt from './CardAnt';
import axios from 'axios';
import DocContext from '../../context/doc/docContext';
import TopHeader from '../layout/partials/TopHeader';
import { useSnackbar } from 'notistack';
import { Divider } from 'antd';


import FloatingButton from '../layout/partials/FloatingButton';

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
      <TopHeader title='Zarządzaj instrukcjami' icon='fas fa-cog' />

      <h5 style={style.h3}>INSTRUKCJE DLA OPERATORA</h5>
      <div className='animated fadeIn' style={style}>
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
      <Divider />
      <h5 style={style.h3}>INSTRUKCJE DLA BENEFICJENTA</h5>
      <div className='animated fadeIn' style={style}>
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
      <FloatingButton
        scale={1}
        text='Dodaj'
        linkTo='newdoc'
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

export default AllCards;
