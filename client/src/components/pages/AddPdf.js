import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Select, Button } from 'antd';
import { useSnackbar } from 'notistack';
import PdfContext from '../../context/pdf/pdfContext';
import FileUpload from '../layout/partials/FileUpload';
import TopHeader from '../layout/partials/TopHeader';
import CardPdfPreview from '../layout/partials/CardPdfPreview';

const { Option } = Select;

const AddPdf = (props) => {
  const pdfContext = useContext(PdfContext);
  const { setAllReady, allReady } = pdfContext;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setBody({
      title: '',
      target: '',
      type: 'pdf',
      shortTitle: 'TEST',
      publishDate: '',
      ver: '',
      prevVer: '',
      pagesCount: '',
      premiereTag: '',
      archived: '',
    });
  }, []);

  const [body, setBody] = useState({
    title: '',
    target: '',
    type: 'pdf',
    shortTitle: 'TEST',
    publishDate: '',
    ver: '',
    prevVer: '',
    pagesCount: '',
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
      body[e.target.id.split('addpdf_')[1]] = e.target.value;
    }
    // eslint-disable-next-line
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
      await axios.post('/api/pdfs', body, config).then((res) => {
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
        <TopHeader title='Dodawanie PDF' icon='fas fa-file-import' />

        <div style={style.container}>
          <CardPdfPreview
            id='card_pdf_preview_container'
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

            <Form.Item label='Krótki tytuł' onChange={handleChange} hasFeedback>
              {getFieldDecorator('shortTitle', {
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
              })(<Input />)}
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
              {getFieldDecorator('publishDate', {
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
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Wersja' onChange={handleChange} hasFeedback>
              {getFieldDecorator('ver', {
                rules: [
                  {
                    required: true,
                    message: 'Podaj numer wersji',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item
              onChange={handleChange}
              label='Poprzednia wersja'
              hasFeedback
            >
              {getFieldDecorator('prevVer', {
                rules: [
                  {
                    required: true,
                    message: 'Podaj numer wersji',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item onChange={handleChange} label='Liczba stron' hasFeedback>
              {getFieldDecorator('pagesCount', {
                rules: [
                  {
                    required: true,
                    message: 'Podaj liczbę stron',
                    whitespace: true,
                  },
                ],
              })(<Input type='number' />)}
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
                disabled={!allReady}
                type='primary'
                size='large'
                htmlType='submit'
                style={style.buttonL}
              >
                Utwórz
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

const WrappedAddNewPdfForm = Form.create({ name: 'addpdf' })(AddPdf);
export default WrappedAddNewPdfForm;
