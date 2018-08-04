const express = require('express');
const router = express.Router();

const userModelHelpers = require('./../models/model-helpers/userModelHelper');
const loginHelpers = require('./helpers/login-helpers');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const uberUserID = req.query.uuid;
  const userHistory = await userModelHelpers.getSummaryHistory(uberUserID);
  
  // Sum the "city_trips_count" property for the returned object
  function countTrips(historyArray){
    let count = 0;
    historyArray.forEach(element => {
      count += element['city_trips_count'];
    });
    return count;
  }

  const travelCount = countTrips(userHistory);

  // Request count of user history from Uber (get auth token from the session)
  // Compare the two returned values and sync db
  // Returned sync data to the user 
  console.log(`You have travelled ${travelCount} times!!`);
  const token = JSON.stringify(req.session.credentials)
  console.log(`Your credentials are => ${token}`);
  res.send(userHistory);
});

module.exports = router;
