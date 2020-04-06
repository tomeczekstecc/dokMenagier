const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({ result: "fail", msg: "Nieprawidłowy token - brak dostępu", msg_nr: "1" })
  }

  try {
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user.id = decodedUser.userId
    next()
  } catch (error) {
    res.json({ result: "fail", msg: "Błąd serwera", msg_nr: "0", error_msg: error.message })
  }

}