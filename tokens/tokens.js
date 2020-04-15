const jwt = require('jsonwebtoken');

const createAccessToken = (userId) => {
  return jwt.sign( userId , process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });
};

// console.log(process.env.ACCESS_TOKEN_SECRET);

const createRefreshToken = (userId) => {
  return jwt.sign( userId , process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const sendAccessToken = (req, res, accessToken) => {
  res.send({
    msg: 'Zalogowano.',
    result: 'success',
    accessToken,
    name: req.body.name,
  });
};

const sendRefreshToken = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/api/auth/refresh_token',
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
