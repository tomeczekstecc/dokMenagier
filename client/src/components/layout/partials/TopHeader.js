import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from '../partials/MenuButton';
const TopHeader = (props) => {
  let homeDisable, allPdfsDisable;

  if (props.title === 'Zarządzanie') {
    allPdfsDisable = 'none';
  } else if (props.title === 'Start') {
    homeDisable = 'none';
  }

  const [displayMenu, setDisplayMenu] = useState(false);

  const handleClickMenuButton = () => {
    setDisplayMenu(!displayMenu);
    console.log(displayMenu);
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
          <Link style={style.li} to='/allpdfs'>
            {/* <i className='fas fa-cog'></i> */}
            PDF
          </Link>
        </li>
        <li>
          <Link style={style.li} to='/allfilms'>
            {/* <i className='fas fa-cog'></i> */}
            Filmy
          </Link>
        </li>

        <li style={{ display: `${homeDisable}` }}>
          {' '}
          <Link to='/' style={style.li}>
            {/* <i className='fas fa-home'></i> */}
            Start
          </Link>
        </li>
        <li >
          {' '}
          <Link to='/' style={style.li}>
            {/* <i className='fas fa-user'></i> */}
            Log<strong>In</strong>
          </Link>
        </li>
        <li>
          {' '}
          <Link to='/' style={style.li}>
            {/* <i className='fas fa-heart'></i> */}
            Log<strong>Out</strong>
          </Link>
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
  ul: {

  },

  li: {
    color: ' #2c405e',
    margin: '0 13px',
  },
};

export default TopHeader;
