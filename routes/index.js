require('dotenv').config();
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

  // Error message if no Auth Token returned by Uber
  if(req.session.message){
    const errorMessage = req.session.message['uberAuth'];
    
    return res.render('index', {
      title: 'MyRides | Login',
      errorMessage
    });
  }
  
  res.render('index', {
    title: 'MyRides | Login',
  });
});


module.exports = router;

