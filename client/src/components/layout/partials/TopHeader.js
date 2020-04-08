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
    <div>
      <header>
        <div style={style}>
          <div style={style.textWhite}>
            <i className={props.icon}></i> {props.title}
          </div>

          <div style={{ display: `${allDocsDisable}` }}>
            <Link style={style.textLight} to='/alldocs'>
              <i className='fas fa-cog'></i> Zarządzaj
            </Link>
          </div>

          <div style={{ display: `${homeDisable}` }}>
            {' '}
            <Link style={style.textLight} to='/'>
              <i className='fas fa-home'></i> Start
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

const style = {
  display: 'flex',
  maxWidth: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
  alignContent: 'center',
  background: '#0275d8',
  textAlign: 'center',
  padding: '20px',
  display: 'flex',
  maxWidth: '100%',

  textWhite: {
    fontSize: '2.2rem',
    marginRight: '3rem',
    fontWeight: 'bold',
    color: 'white',
    maxWidth: '100%',
  },
  textLight: {
    fontSize: '1.4rem',
    color: 'white',
    maxWidth: '100%',
  },
};

export default TopHeader;
