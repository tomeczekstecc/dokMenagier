import React from 'react';
import FloatingButton from '../layout/partials/FloatingButton';
import TopHeader from '../layout/partials/TopHeader';
import pdf_logo from '../../img/ins_pdf_logo.png'
import film_logo from '../../img/ins_film_logo.png'

const Home = () => {
  return (
    <>
      <TopHeader title='Start' icon='fas fa-home' />
      {/* <div style={style.main}>
        <div style={style.item}>
          <FloatingButton
            scale={2}
            text='Zarządzaj'
            linkTo='allpdfs'
            position='relative'
            p_marginTop='60px'
          />
        </div>

        <div style={style.item}>
          {' '}
          <FloatingButton
            scale={2}
            text='Dodaj'
            linkTo='newpdf'
            position='relative'
            p_marginTop='60px'
          />
        </div>
      </div> */}

      <div id='home_container'>
        <img className="home_btn"src={pdf_logo} id='home_button_pdf'></img>


        <img className="home_btn"src={film_logo} id='home_button_film'></img>

      </div>
    </>

  );
};

const style = {
  main: {
    position: 'static',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    top: '40%',
    left: '45%',
    // backgroundImage: 'url("http://bestcodes.pl/lsi/img/rwd_lsi_corn.png")',
    backgrounPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  item: {
    display: 'flex',
    flexDirectiom: 'column',
  },
};

export default Home;
