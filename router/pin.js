const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Pin = require('../models/Pin')



//@desc register user
//@route POST /api/pin
//@access public
router.post('/', async (req, res) => {
  const { pinValue } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPin = await bcrypt.hash(pinValue, salt)

  const pin = new Pin(
    {
      value: hashedPin
    }
  )

  try {
    await pin.save()
    return res.json({
      msg: 'Pin został zapisany', hashedPin
    })
  } catch (error) {
    console.log(eror);
  }

})


module.exports = router