import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import FloatingButton from '../layout/partials/FloatingButton';
import TopHeader from '../layout/partials/TopHeader';
import AuthContext from '../../context/auth/authContext';
import pdf_logo from '../../img/ins_pdf_logo.png';
import film_logo from '../../img/ins_film_logo.png';

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // if (
  //   !user.accessToken ||
  //   user.accessToken === undefined ||
  //   user.accessToken === ''
  // ) {
  //   props.history.push('/login');
  // }

  return (
    <>
      <TopHeader title='Start' icon='fas fa-home' />

      <div id='home_container'>
        <Link to='/allpdfs'>
          <img className='home_btn' src={pdf_logo} id='home_button_pdf'></img>
        </Link>
        <Link to='/allfilms'>
          <img className='home_btn' src={film_logo} id='home_button_film'></img>
        </Link>
      </div>
    </>
  );
};

export default Home;
