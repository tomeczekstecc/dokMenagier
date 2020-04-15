const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      result: 'warning',
      msg: 'Nieprawidłowy token - brak dostępu',
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  

    req.user = decodedUser;
    req.user.id = decodedUser.userId;
    next();
  } catch (error) {
    res.json({
      result: 'error',
      msg: error.message,
    });
  }
};
