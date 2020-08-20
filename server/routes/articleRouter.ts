import express from 'express';
var router = express.Router();

router.get('/get/{id}', function (req, res) {
  res.send('get by id')
})

router.get('/list', function (req, res) {
  res.send('getList')
})

router.post('/create', function (req, res) {
    res.send('create')
  })

export default router;