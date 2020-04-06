import React, { useContext } from 'react';
import { Card, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import DocContext from '../../context/doc/docContext';

const { Meta } = Card;

const CardAnt = ({
  doc,
  handleOnClickDelete,
  handleOnClickChangeSort,
  loading,
}) => {
  const docContext = useContext(DocContext);

  const { setCurDoc } = docContext;

  let displayBadge = 'none';
  if (!doc.premiereTag) {
    displayBadge = 'none';
  } else {
    displayBadge = 'block';
  }
  let iconType = 'none';
  if (doc.type === 'pdf') {
    iconType = 'far fa-file-pdf';
  } else {
    iconType = 'far fa-file-video';
  }

  return (
    <div style={{zIndex:-2}}>
      <div>
        <i
          className={iconType}
          style={{
            transform: 'translate(235px,235px) scale(1.1)',
            zIndex: 10,
            maxWidth:"50px",
            display: 'block',
            color: 'rgba(0,0,0,0.4)',
            fontSize: '1.8em',
            zIndex: 1,
          }}
        ></i>
      </div>
      <Badge
        count='NOWOŚĆ'
        style={{
          backgroundColor: '#db4d4d',
          transform: 'translate(100px,40px) scale(1.1)',
          zIndex: 10,
          display: `${displayBadge}`,
        }}
      >
        <a href='#' className='head-example' />
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
          <Icon
            type='arrow-up'
            key='arrow-up'
            onClick={() => handleOnClickChangeSort(doc._id, 'substract')}
          />,
          <Icon
            type='arrow-down'
            key='arrow-down'
            onClick={() => handleOnClickChangeSort(doc._id, 'add')}
          />,
          <Link to={`/editdoc/${doc._id}`} onClick={() => setCurDoc(doc._id)}>
            <Icon type='edit' key='edit' />
          </Link>,

          <Icon
            type='delete'
            key='delete'
            onClick={() => handleOnClickDelete(doc._id)}
          />,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={doc.shortTitle.toUpperCase()}
          description={
            <p>
              Typ: {doc.type}, Dla: {doc.target}, Stron: {doc.pagesCount}
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
    height: 312,
    overflow: 'hidden',
    boxShadow: '1px 1px 10px -4px rgba(0,0,0,0.75)',
    zIndex: -1,
  },
  img: {
    width: '100%',

    borderBottom: '2px solid rgba(192, 192, 192,.3)',
  },
};

export default CardAnt;
