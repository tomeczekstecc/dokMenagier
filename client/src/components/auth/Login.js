import React, { Fragment, useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
import Spinner from '../layout/partials/Spinner';
import './auth.css';
import TopHeader from '../layout/partials/TopHeader';

const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const authContext = useContext(AuthContext);
  const { setUser } = authContext;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const headers = {
      'Content-type': 'application/json',
    };
    const body = {
      name,
      password,
    };
    await axios.post(`http://${process.env.PORT}/api/auth/login`, body, headers).then((res) => {
      enqueueSnackbar(
        `${res.data.msg === undefined ? 'Pomyślnie zalogowano' : res.data.msg}`,
        {
          variant: `${
            res.data.result === undefined ? 'info' : res.data.result
          }`,
        }
      );
      setUser({
        accessToken: res.data.accessToken,
      });
      res.data.result === undefined && props.history.push('/');
    });

    setLoading(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setName(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }

  };

  return(
    <Fragment>
      <TopHeader title='Logowanie' icon="fas fa-sign-in-alt"/>{' '}
      <div className='main_container_login'>
        <div className='container_login'>
          <div className='header'>
            .<h2>Zaloguj się </h2>
          </div>
          <form onSubmit={handleSubmit} id='form' className='form_login'>
            <div className='form-control_login'>
              <label htmlFor='username'>Imię</label>
              <input
                onChange={handleChange}
                type='text'
                placeholder='Podaj imię..'
                id='username'
                name='username'
              />
            </div>

            <div className='form-control_login'>
              <label htmlFor='password'>Hasło</label>
              <input
                onChange={handleChange}
                type='password'
                placeholder='Podaj hasło..'
                id='password'
                name='password'
              />
            </div>

  <button>Zaloguj</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
