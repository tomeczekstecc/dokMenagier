const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
require('dotenv/config');

const app = express();

connectDB();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cookieParser());


let access
process.env.NODE_ENV === 'development'
  ? (access = process.env.CORS_ACCESS_DEV)
  : (access = process.env.CORS_ACCESS_PROD);
app.use(fileUpload());
app.use(
  cors({
    origin: access,
    default: access,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./router/auth'));
app.use('/api/pdfs', require('./router/pdfs'));
app.use('/api/films', require('./router/films'));
app.use('/api/upload', require('./router/upload'));

app.all('*', function (req, res, next) {
  let origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server startet on PORT ${PORT} in ${process.env.NODE_ENV} mode.`)
);
