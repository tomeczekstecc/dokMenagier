import React from 'react';
import { Link } from 'react-router-dom';

const TopHeader = (props) => {
  return (
    <div>
      <header>
        <div style={style}>
          <div style={style.textWhite}> {props.title}</div>
          <div>
            <div>
              <Link style={style.textLight} to='/alldocs'>
                Wszystkie dokumenty
              </Link>
            </div>

            <div>
              {' '}
              <Link style={style.textLight} to='/'>
                {' '}
                Start{' '}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

const style = {
  width: '100%',
  height: '13vh',
  background: '#0275d8',
  textAlign: 'center',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',

  textWhite: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
  },
  textLight: {
    fontSize: '1rem',

    color: 'white',
  },
};

export default TopHeader;
