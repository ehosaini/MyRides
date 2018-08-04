const express = require('express');
const router = express.Router();

const userModelHelpers = require('./../models/model-helpers/userModelHelper');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User homepage');
});

module.exports = router;
