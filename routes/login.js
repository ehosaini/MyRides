require('dotenv').config();
/* Libraries */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');


/* Config values */
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const server_token = process.env.SERVER_TOKEN;
const redirect_uri = 'http://localhost:3000/api/callback';

/* Uber API Endpoints */
const tokenExchEndpoint = 'https://login.uber.com/oauth/v2/token';
const userProfileEndpoint = 'https://api.uber.com/v1.2/me';
const userActivityEndpoint = 'https://api.uber.com/v1.2/history';

/* Middleware & helper functions */
const profileGetter = require('./routes-middlewares/login-middlewares');
const loginHelpers = require('./helpers/login-helpers');




/* Pre-declared variables */
let authCode = null;
let axiosActivityInstance = null;

/* Step 1: Redirect user to Uber Authorization URL */
router.get('/api/login', (req, res, next) => {
    const authURL = `https://login.uber.com/oauth/v2/authorize?client_id=${client_id}&response_type=code`;
    res.redirect(authURL);

});

/* Step 2:  Recieve authorization code from Uber after user grants
permission */
router.get('/api/callback', (req, res, next) => {
    authCode = req.query.code;

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
    async function getUserInfo(params) {
        const authToken = await loginHelpers.getAuthToken(tokenExchEndpoint, params);
        const userInfo = await loginHelpers.getUserProfile(userProfileEndpoint, authToken['access_token']);
        const userHistory = await loginHelpers.getUserActivities(userActivityEndpoint, authToken['access_token'], limit = 50);
        console.log(`Updating DB with: ${userInfo, userHistory}`);
    }
    // const authToken = await loginHelpers.getAuthToken(tokenExchEndpoint, strParams);
    // const userInfo = await loginHelpers.getUserProfile(userProfileEndpoint, authToken['access_token']);
    // const userHistory = await loginHelpers.getUserActivities(userActivityEndpoint, authToken['access_token'], limit = 50);
    
    getUserInfo(strParams);

    res.send('redircting to user homepage');

});



module.exports = router;