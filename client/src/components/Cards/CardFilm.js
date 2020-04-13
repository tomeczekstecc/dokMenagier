import React, { useContext } from 'react';
import { Card, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import FilmContext from '../../context/film/filmContext';

const { Meta } = Card;

const CardFilm = ({
  film,
  handleOnClickDelete,
  handleOnClickChangeSort,
  loading,
}) => {
  const filmContext = useContext(FilmContext);

  const { setCurFilm } = filmContext;

  let displayBadge = 'none';
  if (!film.premiereTag) {
    displayBadge = 'none';
  } else {
    displayBadge = 'block';
  }

  let iconType ='far fa-file-video';


  return (
    <div id='card_ant'
      style={{
        zIndex: -2,
        fontFamily:
          'apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji',
      }}
    >
      <div>
        <i
          className={iconType}
          style={{
            transform: 'translate(350px,100px) scale(1.3)',
            zIndex: 10,
            maxWidth: '50px',
            display: 'block',
            color: 'rgba(0,0,0,0.4)',
            fontSize: '1.8em',

          }}
        ></i>
      </div>
      <Badge
        count='NOWOŚĆ'
        style={{
          backgroundColor: '#db4d4d',
          transform: 'translate(50px,70px) scale(1.1)',
          zIndex: 10,
          display: `${displayBadge}`,
        }}
      >

      </Badge>
      <Card id='card_ant_film'
        style={style.main}
        cover={
          <img
            style={style.img}
            alt='example'
            // src='./spinner.gif'
            // src={`1
            //   loading
            //     ? spinner
            //     : 'http://bestcodes.pl/lsi/app_files/img/rwd.jpg'
            // }
            src='http://bestcodes.pl/lsi/app_files/img/rwd_film.jpg'
            // src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
          />
        }
        actions={[
          // <Icon type='download' key='download' />,
          <Icon
            type='arrow-up'
            key='arrow-up'
            onClick={() => handleOnClickChangeSort(film._id, 'substract')}
          />,
          <Icon
            type='arrow-down'
            key='arrow-down'
            onClick={() => handleOnClickChangeSort(film._id, 'add')}
          />,
          <Link to={`/editfilm`} onClick={() => setCurFilm(film._id)}>
            <Icon type='edit' key='edit' />
          </Link>,

          <Icon
            type='delete'
            key='delete'
            onClick={() => handleOnClickDelete(film._id)}
          />,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={film.title.toUpperCase()}

        />
      </Card>
    </div>
  );
};

const style = {
  main: {
    margin: '15px',
    maxWidth: 370,
    height: 300,
    overflow: 'hidden',
    boxShadow: '1px 1px 10px -4px rgba(0,0,0,0.75)',
    zIndex: -1,
  },
  img: {
height:"190px",


    borderBottom: '2px solid rgba(192, 192, 192,.3)',
  },
};

export default CardFilm;
