const express = require('express');
const router = express.Router();

// const userModelHelpers = require('./../models/model-helpers/userModelHelper');


/* Show users history in tabular form. */
router.get('/', function (req, res, next) {
  // Check that user is signed in
  if (!req.session.credentials) {
    res.redirect('/');
  }

  const uuid = req.session.credentials['uberUserID'];
  const firstName = req.session.credentials['firstName'];

  res.render('myridesTable', {
    title: 'User Rides | Table',
    uuid,
    firstName
  });
});

/* Plot user history on Google Maps */
router.get('/map', function (req, res, next) {

  // Check that the user is signed in
  if (!req.session.credentials) {
    res.redirect('/');
  }

  const uuid = req.session.credentials['uberUserID'];
  const firstName = req.session.credentials['firstName'];

  res.render('myridesMap', {
    title: 'User Rides | Map',
    uuid,
    firstName
  });
});


module.exports = router;