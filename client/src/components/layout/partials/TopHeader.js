import React from 'react';
import { Link } from 'react-router-dom';

const TopHeader = (props) => {
  let homeDisable, allDocsDisable;

  if (props.title === 'Zarządzaj instrukcjami') {
    allDocsDisable = 'none';
  } else if (props.title === 'Strona startowa') {
    homeDisable = 'none';
  }
  return (
    <nav style={style}>
      <p style={style.p}>
        <i className={props.icon}></i> {props.title}
      </p>

      <ul style={style.ul}>
        <li style={{ display: `${allDocsDisable}` }}>
          <Link style={style.li} to='/alldocs'>
            {/* <i className='fas fa-cog'></i> */}
             Zarządzaj
          </Link>
        </li>

        <li style={{ display: `${homeDisable}` }}>
          {' '}
          <Link to='/' style={style.li}>
            {/* <i className='fas fa-home'></i> */}
             Start
          </Link>
        </li>
        <li style={{ display: `${homeDisable}` }}>
          {' '}
          <Link to='/' style={style.li}>
            {/* <i className='fas fa-user'></i> */}
            Log<strong>In</strong>
          </Link>
        </li>
        <li style={{ display: `${homeDisable}` }}>
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
    display: 'flex',
    justifyContent: 'scenter',
    alignItems: 'center',
    alignContent: 'center',
    listStyleType: 'none',
    margin: '0 20px',
    color: '#2c405e',
    fontWeight: 'normal',
  },

  li:{
  color:' #2c405e',
  margin:'0 13px'
  }
};

export default TopHeader;
