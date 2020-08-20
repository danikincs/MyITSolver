var express = require('express');
var router = express.Router();

router.get('/get/{id}', function (req, res) {
  res.send('get by id')
})

router.get('/list', function (req, res) {
  res.send('renewToken')
})

router.post('/create', function (req, res) {
    res.send('renewToken')
  })

module.exports = router