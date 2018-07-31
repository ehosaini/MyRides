require('dotenv').config();
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'MyRides'
  });
});


module.exports = router;

