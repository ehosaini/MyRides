const express = require('express');
const router = express.Router();

const userModelHelpers = require('./../models/model-helpers/userModelHelper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const uberUserID = req.query.uuid;
  res.send(`Got your id: ${uberUserID}`);
});

module.exports = router;
