import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import axios from 'axios';
import { Form, Input, Select, Button } from 'antd';
import { useSnackbar } from 'notistack';
import FilmContext from '../../context/film/filmContext';
import AuthContext from '../../context/auth/authContext';
import TopHeader from '../layout/partials/TopHeader';
import CardFilmPreview from '../layout/partials/CardFilmPreview';

const { Option } = Select;

const AddFilm = (props) => {
  const filmContext = useContext(FilmContext);
  const { setAllReady, allReady } = filmContext;
  const { enqueueSnackbar } = useSnackbar();
  const authContext = useContext(AuthContext);
  // const { user } = authContext;


  // if (
  //   !user.accessToken ||
  //   user.accessToken === undefined ||
  //   user.accessToken === ''
  // ) {
  //   props.history.push('/login');
  // }

  useEffect(() => {
    setBody({
      title: '',
      target: '',
      type: 'film',
      linkYT: '',
      premiereTag: '',
      archived: '',
    });
  }, []);

  const [body, setBody] = useState({
    title: 'TEST',
    target: '',
    type: 'film',
    linkYT: '',
    premiereTag: '',
    archived: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pending, setPending] = useState(false);

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const handleChange = async (e) => {
    if (e === 'ben' || e === 'oper') {
      body.target = e;
    } else if (e === 'premiere') {
      body.premiereTag = true;
    } else if (e === 'notpremiere') {
      body.premiereTag = false;
    } else if (e === 'archived') {
      body.archived = false;
    } else if (e === 'notarchived') {
      body.archived = true;
    } else {
      body[e.target.id.split('addfilm_')[1]] = e.target.value;
    }
    // eslint-disable-next-line
    body.filmFileName = `${
      '[' + body.ver + ']' + '_' + body.shortTitle + '_' + body.target
    }.film`;

    if (
      body.title !== '' &&
      body.title.length > 2 &&
      body.title.length < 101 &&
      body.target !== '' &&
      body.linkYT !== '' &&
      body.linkYT.length > 2 &&
      body.premiereTag !== '' &&
      body.archived !== ''
    ) {
      setAllReady(true);
    } else {
      setAllReady(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post('/api/films', body, config).then((res) => {
        if (res.data.result === 'success') {
          setTimeout(() => {
            enqueueSnackbar(`${res.data.msg}`, {
              variant: `${res.data.result}`,
            });
            props.history.push('/allfilms');
          }, 4000);
        } else {
          enqueueSnackbar(`${res.data.msg}`, {
            variant: `${res.data.result}`,
          });
        }
      });
      setTimeout(() => {
        setPending(false);
      }, 4000);
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: `error`,
      });
      console.log(error.message);
    }

    setIsSubmitting(true);
    setAllReady(false);
  };

  return (
    <>
      <div style={style.main}>
        <TopHeader title='Dodawanie filmu' icon='fas fa-file-import' />

        <div style={style.container}>
          <CardFilmPreview
            id='card_film_preview_container'
            style={style.preview}
            body={body}
          />
          <Form {...formItemLayout} onSubmit={handleSubmit} style={style.form}>
            <Form.Item label='Tytuł' onChange={handleChange} hasFeedback>
              {getFieldDecorator('title', {
                rules: [
                  {
                    min: 3,
                    message: 'Tytuł musi składać się z co najmniej 3 znaków',
                  },
                  {
                    max: 100,
                    message: 'Tytuł może składać się z co najwyżej 100 znaków',
                  },
                  {
                    required: true,
                    message: 'Musisz podać tytuł',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Dla kogo' hasFeedback>
              {getFieldDecorator('target', {
                rules: [
                  {
                    required: true,
                    message: 'Musisz wybrać wartosć',
                  },
                ],
              })(
                <Select onChange={handleChange} style={{ width: 175 }}>
                  <Option value='ben'>Beneficjent</Option>
                  <Option value='oper'>Operator</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label='Link YouTube' onChange={handleChange} hasFeedback>
              {getFieldDecorator('linkYT', {
                rules: [
                  {
                    min: 3,
                    message: 'Link musi składać się z co najmniej 3 znaków',
                  },
                  {
                    required: true,
                    message: 'Musisz podać link do YouTube',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Premierowe' hasFeedback>
              {getFieldDecorator('premiereTag', {
                rules: [
                  {
                    required: true,
                    message: 'Wybierz wartość',
                  },
                ],
              })(
                <Select onChange={handleChange} style={{ width: 175 }}>
                  <Option value='notpremiere'>Nie</Option>
                  <Option value='premiere'>Tak</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label='Archiwalne' hasFeedback>
              {getFieldDecorator(
                'archived',

                {
                  rules: [
                    {
                      required: true,
                      message: 'Wybierz wartość',
                    },
                  ],
                }
              )(
                <Select onChange={handleChange} style={{ width: 175 }}>
                  <Option value='archived'>Nie</Option>
                  <Option value='notarchived'>Tak</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                loading={pending}
                disabled={!allReady}
                type='primary'
                size='large'
                htmlType='submit'
                style={style.buttonL}
              >
                Utwórz
              </Button>

              <Link to='/allfilms'>
                <Button
                  style={style.buttonR}
                  size='large'
                  type='default'
                  htmlType='submit'
                >
                  Wróć
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

const style = {
  main: {
    // maxWidth: '100%',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '40% 60%',
    width: '100%',
  },
  buttonL: {
    width: '8rem',
    height: '3rem',
  },

  buttonR: {
    marginLeft: '15px',
    width: '8rem',
    height: '3rem',
  },
};

const WrappedAddNewFilmForm = Form.create({ name: 'addfilm' })(AddFilm);
export default WrappedAddNewFilmForm;
