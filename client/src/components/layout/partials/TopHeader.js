import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from '../partials/MenuButton';
import AuthContext from '../../../context/auth/authContext';
import { useSnackbar } from 'notistack';

const TopHeader = (props) => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { logOutCallback } = authContext;
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('Poprawnie wylogowano', {
      variant: 'info',
    });
    logOutCallback();
  };


  const [displayMenu, setDisplayMenu] = useState(false);

  const handleClickMenuButton = () => {
    setDisplayMenu(!displayMenu);

  };

  return (
    <nav style={style}>
      <p style={style.p}>
        <i className={props.icon}></i> {props.title}
      </p>

      <MenuButton handleClickMenuButton={handleClickMenuButton} />

      <ul
        style={{
          display: `${displayMenu ? 'flex' : 'none'}`,
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          listStyleType: 'none',
          margin: '0 20px',
          color: '#2c405e',
          fontWeight: 'normal',
          padding: 0,
        }}
      >
        <li>
          <a
            title='strona z instrukcjami'
            target='_blank'
            style={{ margin: '0 10px' }}
            href='http://bestcodes.pl/lsi/index.html'
          >
            <i className='fas fa-eye'></i>
          </a>
        </li>

        <li>
          <Link
            style={user.accessToken ? style.li : { display: 'none' }}
            to='/allpdfs'
          >
            {/* <i className='fas fa-cog'></i> */}
            PDF
          </Link>
        </li>
        <li>
          <Link
            style={user.accessToken ? style.li : { display: 'none' }}
            to='/allfilms'
          >
            {/* <i className='fas fa-cog'></i> */}
            Filmy
          </Link>
        </li>

        <li>
          {' '}
          <Link
            to='/'
            style={user.accessToken ? style.li : { display: 'none' }}
          >
            {/* <i className='fas fa-home'></i> */}
            Start
          </Link>
        </li>

        <li>

          <a
            onClick={handleClick}
            style={user.accessToken ? style.li : { display: 'none' }}
          >
            {/* <i className='fas fa-heart'></i> */}
            Log<strong>Out</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  flexWrap: 'wrap',

  background: '#fff',
  color: '#2c405e',
  fontWeight: 'bold',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  padding: '20px',
  p: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    maxWidth: '100%',
  },
  ul: {},

  li: {
    color: ' #2c405e',
    margin: '0 13px',
  },
};

export default TopHeader;
