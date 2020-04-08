import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Progress from '../components/layout/partials/Progress';
import DocContext from '../context/doc/docContext';

const FileUpload = ({ isSubmitting, setIsSubmitting, pdfFileName }) => {
  const docContext = useContext(DocContext);
  const { transferDone, setTransferDone } = docContext;
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Kliknij, aby dodać plik ');
  // eslint-disable-next-line
  const [uploadProcentage, setUploadProcentage] = useState(0);

  useEffect(() => {}, []);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setTransferDone(true);
  };

  const handleOnSubmit = async () => {
    // e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pdfName: `${pdfFileName}`,
        },
        onUploadProgress: (ProgressEvent) => {
          if (file) {
            setUploadProcentage(
              parseInt(
                Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
              )
            );
            setTimeout(() => setUploadProcentage(0), 3000);
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  isSubmitting && handleOnSubmit();
  setIsSubmitting(false);
  return (
    <Fragment>
      <div style={style.main}>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={handleOnChange}
            lang='pl'
          />
          <label
            style={style.input}
            className='custom-file-label'
            name='Wybierz plik'
            htmlFor='customFile'
          >
            {filename.slice(0, 60) + '...'}
          </label>
        </div>
        <Progress percentage={uploadProcentage} />
      </div>
    </Fragment>
  );
};

const style = {
  main: {
    width: '100%',
    transform: 'translateY(-40%)',
    // overflow: 'hidden',
    // marginLeft: '25vw',
  },
  input: {
    width: '100%',
    // height: '2.7rem',
    // overflow: 'hidden',
  },
};

export default FileUpload;
