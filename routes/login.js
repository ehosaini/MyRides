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

/* Middleware functions */
const profileGetter = require('./routes-middlewares/login-middlewares');




/* Pre-declared variables */
let authCode = null;

/* Step 1: Redirect user to Uber Authorization URL */
router.get('/api/login', (req, res, next) => {
    const authURL = `https://login.uber.com/oauth/v2/authorize?client_id=${client_id}&response_type=code`;
    res.redirect(authURL);

});

/* Step 2:  Recieve authorization code from Uber after user grants
permission */
router.get('/api/callback', function (req, res, next) {
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

    axios.post(tokenExchEndpoint, strParams).then(response => {
        if (response.status !== 200) {
            erroMessage = {
                status: response.status,
                statusText: response.statusText,
                data: response.data,
            }
            throw Error(erroMessage);
        }
        const responseData = response.data;

        const axiosProfileInstance = axios.create({
            headers: {
                Authorization: `Bearer ${responseData['access_token']}`,
                'Accept-Language': 'en_US',
                'Content-Type': 'application/json'
            }
        });

        // axiosInstance.get(userProfileEndpoint)
        //     .then(profileRes => {
        //         res.send(profileRes.data);
        //     }).catch(error => {throw error});

        const axiosActivityInstance = axios.create({
            headers: {
                Authorization: `Bearer ${responseData['access_token']}`,
                'Accept-Language': 'en_US',
                'Content-Type': 'application/json'
            }
        });

        axiosActivityInstance.get(userActivityEndpoint, {
                params: {
                    limit: 50,
                    offset: null
                }
            })
            .then(activityRes => {
                res.send(activityRes.data);
            }).catch(error => {
                throw error
            });

    }).catch((error) => {
        // res.status(400).send('ERROR! cannot access your data at this time.');
        console.log(error);
    });

});



module.exports = router;