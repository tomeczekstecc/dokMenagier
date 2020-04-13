import React, { useContext } from 'react';
import { Card, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import PdfContext from '../../context/pdf/pdfContext';

const { Meta } = Card;

const CardPdf = ({
  pdf,
  handleOnClickDelete,
  handleOnClickChangeSort,
  loading,
}) => {
  const pdfContext = useContext(PdfContext);

  const { setCurPdf } = pdfContext;

  let displayBadge = 'none';
  if (!pdf.premiereTag) {
    displayBadge = 'none';
  } else {
    displayBadge = 'block';
  }

  let iconType = 'far fa-file-pdf';

  return (
    <div id='card_ant_pdf'
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
            transform: 'translate(235px,235px) scale(1.1)',
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
          <Icon
            type='arrow-up'
            key='arrow-up'
            onClick={() => handleOnClickChangeSort(pdf._id, 'substract')}
          />,
          <Icon
            type='arrow-down'
            key='arrow-down'
            onClick={() => handleOnClickChangeSort(pdf._id, 'add')}
          />,
          <Link to={`/editpdf`} onClick={() => setCurPdf(pdf._id)}>
            <Icon type='edit' key='edit' />
          </Link>,

          <Icon
            type='delete'
            key='delete'
            onClick={() => handleOnClickDelete(pdf._id)}
          />,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={pdf.shortTitle.toUpperCase()}
          description={
            <p>
              Typ: {pdf.type}, Dla: {pdf.target}, Stron: {pdf.pagesCount}
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

export default CardPdf;
