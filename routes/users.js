/***
* File name: users.js
* Student name: YuKit Tam 
* Student ID: 301221259
* Date: 2021-Oct-02
* 
****/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
