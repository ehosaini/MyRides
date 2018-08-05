const express = require('express');
const router = express.Router();

const userModelHelpers = require('./../models/model-helpers/userModelHelper');
const loginHelpers = require('./helpers/login-helpers');

/* Uber API Endpoints */
const userActivityEndpoint = 'https://api.uber.com/v1.2/history';

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const uberUserID = req.query.uuid;

  // Compare User history with returned data from Uber and sync if they are different
  const userHistory = await userModelHelpers.getSummaryHistory(uberUserID);
  const dbTravelCount = userModelHelpers.countTrips(userHistory);
  const authToken = req.session.credentials['authToken']; // session data is stored in login router upon redirect by Uber
  const uuid = req.session.credentials['uuid'];
  const userUberHistory = await loginHelpers.getUserActivities(userActivityEndpoint, authToken, limit = 50);
  const uberTravelCount = userUberHistory.count;

  if (!dbTravelCount === uberTravelCount) {

    // Fetch the new data from Uber & update db
    const addedHistory = [];
    let offset = dbTravelCount;
    async function updateUserHistory() {

      while (offset < uberTravelCount) {
        const countDiff = uberTravelCount - offset;

        if (countDiff < 50) { // compare the count difference with API return limit (50) and adjust offset amount accordingly 
          offset += countDiff;
        } else {
          offset += 50;
        }

        const userHistory = await loginHelpers.getUserActivities(userActivityEndpoint, authToken, limit = 50, offset);
        addedHistory.push(...userHistory.history);
  
      }

      await userModelHelpers.updateUserHistory(uuid, addedHistory);
    }
  }

  res.send(userHistory);
});

module.exports = router;