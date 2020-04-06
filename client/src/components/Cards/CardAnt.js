import React, { useContext } from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';
import DocContext from '../../context/doc/docContext';

const { Meta } = Card;

const CardAnt = ({
  doc,
  handleOnClickDelete,
  handleOnClickChangeSort,
  loading
}) => {
  const docContext = useContext(DocContext);

  const { setCurDoc } = docContext;

  return (
    <Card
      style={style.main}
      cover={
        <img
          style={style.img}
          alt='example'
          // src='./spinner.gif'
          // src={
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
        <Link to={`/editdoc/${doc._id}`} onClick={()=>setCurDoc(doc._id)}>
          <Icon type='edit' key='edit' />
        </Link>,

        <Icon
          type='delete'
          key='delete'
          onClick={() => handleOnClickDelete(doc._id)}
        />
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
  );
};

const style = {
  main: {
    margin: '15px',
    maxWidth: 250,
    height: 307,
    overflow: 'hidden',
    boxShadow: '1px 1px 10px -4px rgba(0,0,0,0.75)'
  },
  img: {
    width: '100%',
    borderBottom: '2px solid rgba(192, 192, 192,.3)'
  }
};

export default CardAnt;
