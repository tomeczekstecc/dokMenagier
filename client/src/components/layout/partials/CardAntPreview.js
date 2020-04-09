import React from 'react';
import { Card, Icon, Badge } from 'antd';
import {Link} from 'react-router-dom'
const { Meta } = Card;

const CardAntPreview = ({ body }) => {



  let displayBadge = 'none';
  if (!body.premiereTag) {
    displayBadge = 'none';
  } else {
    displayBadge = 'block';
  }
  let iconType = 'none';
  if (body.type === 'pdf') {
    iconType = 'far fa-file-pdf animated flash';
  } else if (body.type === 'film') {
    iconType = 'far fa-file-video animated flash';
  }

  return (
    <div
      id='card_ant_preview'
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
            transform: 'translate(235px,210px) scale(1.1)',
            position: 'fixed',
            zIndex: 10,
            width: '20px',
            display: 'block',
            color: 'rgba(0,0,0,0.4)',
            fontSize: '1.8em',

          }}
        ></i>
      </div>
      <Badge
        count='NOWOŚĆ'
        className='animated flash'
        style={{
          backgroundColor: '#db4d4d',
          transform: 'translate(40px,50px) scale(1.1)',
          zIndex: 10,
          display: `${displayBadge}`,
        }}
      >

      </Badge>
      <Card
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
            src='http://bestcodes.pl/lsi/app_files/img/rwd.jpg'
            // src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
          />
        }
        actions={[
          // <Icon type='download' key='download' />,
          <Icon type='arrow-up' key='arrow-up' />,
          <Icon type='arrow-down' key='arrow-down' />,
          <Link to='!#'>
            <Icon type='edit' key='edit' />
          </Link>,

          <Icon type='delete' key='delete' />,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={body.shortTitle.toUpperCase() || ''}
          description={
            <p className='animated flash'>
              Typ: {body.type}, Dla: {body.target}, Stron: {body.pagesCount}
            </p>
          }
        />
      </Card>
    </div>
  );
};

const style = {
  main: {
    margin: '15px',
    maxWidth: 250,
    minHeight: 312,
    overflow: 'hidden',
    boxShadow: '1px 1px 10px -4px rgba(0,0,0,0.75)',
    zIndex: -1,
  },
  img: {
    width: '100%',

    borderBottom: '2px solid rgba(192, 192, 192,.3)',
  },
};

export default CardAntPreview;
