const express = require('express');
const router = express.Router();
const Pdf = require('../models/Pdf');
const jsftp = require('jsftp');
const fs = require('fs');
const path = require('path');
require('dotenv/config');

// Post a file
router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({result:'error', msg: 'Nie załadowano żadnego pliku!' });
  }


  const file = req.files.file;

  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

  const Ftp = new jsftp({
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    user: process.env.FTP_USER,
    pass: process.env.FTP_PASS,
  });

  setTimeout(() => copyToFtp(), 1000);



  function copyToFtp() {
    function bufferFile(relPath) {
      return fs.readFileSync(path.join(__dirname, relPath)); // zzzz....
    }
    const buffer = bufferFile(`/uploads/${file.name}`);

    Ftp.put(
      buffer,
      `/domains/bestcodes.pl/public_html/lsi/pdf_host/${req.headers.pdfname}`,
      (err) => {
        if (err) {
          console.log(err.message, 'err');
        } else {
          console.log('File transferred successfully!');
        }
      }
    );
  }
});

module.exports = router;
