var express = require('express');
var router = express.Router();

router.get('/createToken', function (req, res) {
  res.send('CreateToken')
})

router.post('/renewToken', function (req, res) {
  res.send('renewToken')
})

module.exports = router