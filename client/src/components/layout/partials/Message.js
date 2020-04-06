import React from 'react';


const Message = ({ msg }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={style}
        className='alert alert-info alert-dismissible fade show'
        role='alert'
      >
        <strong>{msg}</strong>

        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </div>
  );
};

const style = {
  position: 'fixed',
  top: '50px',
  left: '30px',
};

export default Message;
