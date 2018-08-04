require('dotenv').config();
/* Libraries */
const express = require('express');
const router = express.Router();
const querystring = require('querystring');

/* Config values */
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/api/callback';

/* Uber API Endpoints */
const tokenExchEndpoint = 'https://login.uber.com/oauth/v2/token';
const userProfileEndpoint = 'https://api.uber.com/v1.2/me';
const userActivityEndpoint = 'https://api.uber.com/v1.2/history';

/* Middleware & helper functions */
const profileGetter = require('./routes-middlewares/login-middlewares');
const loginHelpers = require('./helpers/login-helpers');
const userModelHelpers = require('./../models/model-helpers/userModelHelper');

/* Pre-declared variables */


/* Step 1: Redirect user to Uber Authorization URL */
router.get('/api/login', (req, res, next) => {
    const authURL = `https://login.uber.com/oauth/v2/authorize?client_id=${client_id}&response_type=code`;
    res.redirect(authURL);

});

/* Step 2:  Recieve authorization code from Uber after user grants
permission */
router.get('/api/callback', async (req, res, next) => {
    let authCode = req.query.code;

    /* Step 3: Get an access token from Uber token endpoint */
    accessTokenParams = {
        client_secret,
        client_id,
        grant_type: 'authorization_code',
        redirect_uri,
        code: authCode,
        scope: 'profile history'
    }

    const strParams = querystring.stringify(accessTokenParams);
    // this function executes after user has been redirect to '/my-rides/

    // Get an auth bearer token from Uber API & store in session
    req.session.credentials = {};
    const authToken = await loginHelpers.getAuthToken(tokenExchEndpoint, strParams);
    req.session.credentials['authToken'] = authToken['access_token'];

    // Get user info from Uber API and store in session
    const userInfo = await loginHelpers.getUserProfile(userProfileEndpoint, authToken['access_token']);
    req.session.credentials['uberUserID'] = userInfo.uuid;

    // Redirect to user page if user is already stored in the database
    const user = await userModelHelpers.findUser(userInfo.uuid);
    if(user && user.uuid === userInfo.uuid){
        
        return res.redirect('/my-rides/'); 
    }

    async function saveUserInfo() {
        const driveHistory = [];

        const userHistory = await loginHelpers.getUserActivities(userActivityEndpoint, authToken['access_token'], limit = 50);
        driveHistory.push(...userHistory.history);

        /* Check user history count and update if less than count returned from Uber API
        Uber history API only returns 50 records which is accounted for in the conditional statement */
        let count = userHistory.count;
        savedRecords = 0; // Should be pulled from the Mongo db not zero
        offset = savedRecords;

        if (count > 50) { // Replace limit with savedRecords 
            while (savedRecords < count) {
                offset += 50;
                const userHistory = await loginHelpers.getUserActivities(userActivityEndpoint, authToken['access_token'], limit = 50, offset);
                driveHistory.push(...userHistory.history);
                savedRecords += 50;
            }
        }

        // Make a new user from returned Uber data
        const newUser = {};
        Object.keys(userInfo).forEach((key) => {
            newUser[key] = userInfo[key];
        });
        newUser.history = driveHistory;
        // save the new user in db
        await userModelHelpers.createUser(newUser);
    }
    saveUserInfo(strParams).catch(error => console.log(error));

    res.redirect('/my-rides/'); 

});


module.exports = router;