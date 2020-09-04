import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PdfContext from '../../context/pdf/pdfContext';
import AuthContext from '../../context/auth/authContext';
import TopHeader from '../layout/partials/TopHeader';
import axios from 'axios';
import FileUpload from '../layout/partials/FileUpload';
import { useSnackbar } from 'notistack';
import { Form, Input, Tooltip, Icon, Select, Button } from 'antd';
import CardPdfPreview from '../layout/partials/CardPdfPreview';

const { Option } = Select;

const EditPdf = (props) => {
  // const { id } = props.match.params;
  const pdfContext = useContext(PdfContext);
  const { curPdf, setAllReady } = pdfContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pending, setPending] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  // if (
  //   !user.accessToken ||
  //   user.accessToken === undefined ||
  //   user.accessToken === ''
  // ) {
  //   props.history.push('/login');
  // }

  let {
    _id,
    title,
    type,
    target,
    shortTitle,
    publishDate,
    ver,
    prevVer,
    pagesCount,
    premiereTag,
    archived,

  } = curPdf[0];

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
    shortTitle,
    publishDate,
    ver,
    prevVer,
    pagesCount,
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
    body.type = 'pdf';
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
      body.pdfFileName = `${
        '[' + body.ver + ']' + '_' + body.shortTitle + '_' + body.target
        }.pdf`;

    }
    //eslint-disable-next-line
    body.pdfFileName = `${
      '[' + body.ver + ']' + '_' + body.shortTitle + '_' + body.target
    }.pdf`;


    if (
      body.title !== '' &&
      body.title.length > 2 &&
      body.title.length < 101 &&
      body.target !== '' &&
      body.shortTitle !== '' &&
      body.shortTitle.length > 2 &&
      body.publishDate !== '' &&
      body.publishDate.length > 5 &&
      body.publishDate.length < 10 &&
      body.ver !== '' &&
      body.prevVer !== '' &&
      body.pagesCount !== '' &&
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
      await axios.put(`/api/pdfs/${_id}`, body, config).then((res) => {
        if (res.data.result === 'success') {
          setTimeout(() => {
            enqueueSnackbar(`${res.data.msg}`, {
              variant: `${res.data.result}`,
            });
            props.history.push('/allpdfs');
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
        <TopHeader title='Edycja PDF' icon='fas fa-file-signature' />

        <div style={style.container}>
          <CardPdfPreview style={style.preview} body={body} />

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

            <Form.Item label='Krótki tytuł' onChange={handleChange} hasFeedback>
              {getFieldDecorator(
                'shortTitle',

                {
                  initialValue: shortTitle,
                  rules: [
                    {
                      min: 3,
                      message:
                        'Krótki tytuł musi składać się z co najmniej 3 znaków',
                    },
                    {
                      required: true,
                      message: 'Musisz podać krótki tytuł',
                    },
                  ],
                }
              )(<Input />)}
            </Form.Item>

            <Form.Item
              onChange={handleChange}
              hasFeedback
              label={
                <span>
                  Data publikacji&nbsp;
                  <Tooltip title='Data publikacji powinna mieć format: IV.2000'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator(
                'publishDate',

                {
                  initialValue: publishDate,
                  rules: [
                    {
                      required: true,
                      message: 'Podaj datę publikacji',
                      whitespace: true,
                    },
                    {
                      min: 6,
                      message:
                        'Data publikacji powinna składać się z co najmniiej 6 znaków (np."I.2020")',
                    },
                    {
                      max: 9,
                      message:
                        'Data publikacji powinna składać się najwyżej z 8 znaków (np."XII.2020")',
                    },
                  ],
                }
              )(<Input />)}
            </Form.Item>

            <Form.Item label='Wersja' onChange={handleChange} hasFeedback>
              {getFieldDecorator(
                'ver',

                {
                  initialValue: ver,
                  rules: [
                    {
                      required: true,
                      message: 'Podaj numer wersji',
                      whitespace: true,
                    },
                  ],
                }
              )(<Input />)}
            </Form.Item>

            <Form.Item
              onChange={handleChange}
              label='Poprzednia wersja'
              hasFeedback
            >
              {getFieldDecorator(
                'prevVer',

                {
                  initialValue: prevVer,
                  rules: [
                    {
                      required: true,
                      message: 'Podaj numer wersji',
                      whitespace: true,
                    },
                  ],
                }
              )(<Input />)}
            </Form.Item>

            <Form.Item onChange={handleChange} label='Liczba stron' hasFeedback>
              {getFieldDecorator(
                'pagesCount',

                {
                  initialValue: pagesCount,
                  rules: [
                    {
                      required: true,
                      message: 'Podaj liczbę stron',
                      whitespace: true,
                    },
                  ],
                }
              )(<Input type='number' />)}
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

            <Form.Item onChange={handleChange} label='Dodaj plik' hasFeedback>
              <FileUpload
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                pdfFileName={body.pdfFileName}
              />
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

              <Link to='/allpdfs'>
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
            <Form.Item onChange={handleChange} label='Nazwa pliku'>
              {getFieldDecorator(
                'pdfFileName',

                {
                  initialValue: body.pdfFileName,

                }
              )(<Input type='text' />)}
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

const WrappedEditPdfForm = Form.create({ name: 'edit' })(EditPdf);
export default WrappedEditPdfForm;
