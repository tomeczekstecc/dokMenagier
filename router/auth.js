const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const tokens = require('../tokens/tokens');

//@desc register user
//@route POST /api/auth/register
//@access public
router.post('/register', async (req, res) => {
  const { name, password, password2 } = req.body;

  if (
    name === '' ||
    password === '' ||
    password2 === '' ||
    password !== password2
  ) {
    return res.json({
      msg: 'Wprowadzono niepoprawne dane rejestarcyjne.',
      result: 'warning',
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      pass: hashedPass,
    });
    await user.save();
    return res.json({
      msg: 'Utworzono użytkownika!',
      result: 'success',
      user_id: user.id,
    });
  } catch (error) {
    res.json({ msg: `Błąd: ${error.message}`, result: 'error' });
  }
});

//@desc login user
//@route POST /api/auth
//@access public
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    //1. Find user in database
    const user = await User.findOne({ name });
    if (!user) {
      return res.json({ msg: 'Logowanie nieudane.', result: 'error' });
    }
    //2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.pass);

    if (!isMatch) {
      return res.json({
        msg: 'Logowanie nieudane.',
        result: 'error',
      });
    } else {
      //3. Create tokens
      const accessToken = tokens.createAccessToken(user.id);
      const refreshToken = tokens.createRefreshToken(user.id);
      //4. save refreshtoken in database

      await User.updateOne(
        { _id: user.id },
        {
          $set: {
            refreshToken,
          },
        }
      );

      //5.Send refresh token as a cookie and access token as a regular response

      tokens.sendRefreshToken(res, refreshToken);
      tokens.sendAccessToken(req, res, accessToken);

    }
  } catch (error) {
    res.json({ msg: `Błąd: ${error.message}`, result: 'error' });
  }

  router.post('/refresh_token', async (req, res) => {
    const token = req.cookies.refreshToken;
    // If we don't have a token in our request
    if (!token) return res.send({ accessToken: '' });
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.send({ accessToken: '' });
    }
    // token is valid, check if user exist
    const user = User.findOne({ _id: payload.userId });
    if (!user) return res.send({ accessToken: '' });
    // user exist, check if refreshtoken exist on user
    if (user.refreshToken !== token) return res.send({ accessToken: '' });
    // token exist, create new Refresh- and accesstoken
    const accessToken = tokens.createAccessToken(user.id);
    const refreshToken = tokens.createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          refreshToken,
        },
      }
    );
    // All good to go, send new refreshtoken and accesstoken
    tokens.sendRefreshToken(res, refreshToken);
    return res.send({ accessToken });
  });
});

module.exports = router;
