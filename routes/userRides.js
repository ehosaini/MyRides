const express = require('express');
const router = express.Router();

const userModelHelpers = require('./../models/model-helpers/userModelHelper');


/* Show users history in tabular form. */
router.get('/', function(req, res, next) {
  res.render('myridesTable', {
    title: 'User Rides | Table'
  });
});

/* Plot user history on Google Maps */
router.get('/map', function(req, res, next) {
  res.render('myridesMap', {
    title: 'User Rides | Map'
  });
});


module.exports = router;
