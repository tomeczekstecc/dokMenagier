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
app.use(fileUpload());

let access
process.env.NODE_ENV === 'development'
  ? (access = process.env.CORS_ACCESS_DEV)
  : (access = process.env.CORS_ACCESS_PROD);
  console.log(access);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./router/auth'));
app.use('/api/pdfs', require('./router/pdfs'));
app.use('/api/films', require('./router/films'));
app.use('/api/upload', require('./router/upload'));

// var allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };

// app.use(allowCrossDomain);

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
