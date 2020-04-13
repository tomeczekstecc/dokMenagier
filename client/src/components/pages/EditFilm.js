import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FilmContext from '../../context/film/filmContext';
import TopHeader from '../layout/partials/TopHeader';
import axios from 'axios';
import FileUpload from '../layout/partials/FileUpload';
import { useSnackbar } from 'notistack';
import { Form, Input, Tooltip, Icon, Select, Button } from 'antd';
import CardFilmPreview from '../layout/partials/CardFilmPreview';

const { Option } = Select;

const EditFilm = (props) => {
  // const { id } = props.match.params;
  const filmContext = useContext(FilmContext);
  const { curFilm, setAllReady } = filmContext;

  const { enqueueSnackbar } = useSnackbar();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pending, setPending] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  let {
    _id,
    title,
    type,
    target,
    linkYT,
    premiereTag,
    archived,
  } = curFilm[0];

  let convPremiereTag, convArchived;

  premiereTag
    ? (convPremiereTag = 'premiere')
    : (convPremiereTag = 'notpremiere');
  archived ? (convArchived = 'archived') : (convArchived = 'notarchived');
  // eslint-disable-next-line
  const [body, setBody] = useState({
    title,
    type,
    target,
    linkYT,
    premiereTag,
    archived,
  });

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

  const handleChange = (e) => {

body.type='film'
    if (e === 'ben' || e === 'oper') {
      body.target = e;
    } else if (e === 'premiere') {
      body.premiereTag = true;
    } else if (e === 'notpremiere') {
      body.premiereTag = false;
    } else if (e === 'archived') {
      body.archived = true;
    } else if (e === 'notarchived') {
      body.archived = false;
    } else {
      body[e.target.id.split('edit_')[1]] = e.target.value;
    }
    //eslint-disable-next-line
    body.filmFileName = `${
      '[' + body.ver + ']' + '_' + body.linkYT + '_' + body.target
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

    let errors = Object.values(props.form.getFieldsError());

    let newErrors = [];
    for (const val of errors) {
      if (val !== undefined) {
        newErrors.push(val);
      }
    }

    if (newErrors.length > 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
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
      await axios.put(`/api/films/${_id}`, body, config).then((res) => {
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
        setTimeout(() => {
          setPending(false);
        }, 4000);
      });
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
        <TopHeader title='Edycja filmu' icon='fas fa-file-signature' />

        <div style={style.container}>
          <CardFilmPreview style={style.preview} body={body} />
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item label='Tytuł' onChange={handleChange} hasFeedback>
              {getFieldDecorator(
                'title',

                {
                  initialValue: title,
                  rules: [
                    {
                      min: 3,
                      message: 'Tytuł musi składać się z co najmniej 3 znaków',
                    },
                    {
                      max: 100,
                      message:
                        'Tytuł może składać się z co najwyżej 100 znaków',
                    },
                    {
                      required: true,
                      message: 'Musisz podać tytuł',
                    },
                  ],
                }
              )(<Input />)}
            </Form.Item>

            <Form.Item label='Dla kogo' hasFeedback>
              {getFieldDecorator(
                'target',

                {
                  initialValue: target,
                  rules: [
                    {
                      required: true,
                      message: 'Musisz wybrać wartosć',
                    },
                  ],
                }
              )(
                <Select onChange={handleChange} style={{ width: 175 }}>
                  <Option value='ben'>Beneficjent</Option>
                  <Option value='oper'>Operator</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label='Link YouTube' onChange={handleChange} hasFeedback>
              {getFieldDecorator(
                'linkYT',

                {
                  initialValue: linkYT,
                  rules: [
                    {
                      min: 3,
                      message:
                        'Link YouTube musi składać się z co najmniej 3 znaków',
                    },
                    {
                      required: true,
                      message: 'Musisz podać krótki link YouTube',
                    },
                  ],
                }
              )(<Input />)}
            </Form.Item>


            <Form.Item label='Premierowe' hasFeedback>
              {getFieldDecorator(
                'premiereTag',

                {
                  initialValue: convPremiereTag,
                  rules: [
                    {
                      required: true,
                      message: 'Wybierz wartość',
                    },
                  ],
                }
              )(
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
                  initialValue: convArchived,
                  rules: [
                    {
                      required: true,
                      message: 'Wybierz wartość',
                    },
                  ],
                }
              )(
                <Select onChange={handleChange} style={{ width: 175 }}>
                  <Option value='notarchived'>Nie</Option>
                  <Option value='archived'>Tak</Option>
                </Select>
              )}
            </Form.Item>

                 <Form.Item {...tailFormItemLayout}>
              <Button
                loading={pending}
                disabled={disableButton}
                type='primary'
                size='large'
                htmlType='submit'
                style={style.buttonL}
              >
                Aktualizuj
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
    gridTemplateColumns: '30% 70%',
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

const WrappedEditFilmForm = Form.create({ name: 'edit' })(EditFilm);
export default WrappedEditFilmForm;
