import React from 'react'

const MenuButton = ({ handleClickMenuButton }) => {
  return (

      <button
        className='burger'
        onClick={() => handleClickMenuButton()}
      >
        &#9776;
      </button>

  );
};

export default MenuButton
