const express = require('express');
const router = express.Router();

const userModelHelpers = require('./../models/model-helpers/userModelHelper');


/* GET users listing. */
router.get('/', async(req, res, next) => {
  const uberUserID = req.query.uuid;
  const userHistory = await userModelHelpers.getSummaryHistory(uberUserID);
  res.send(userHistory);
});

module.exports = router;
