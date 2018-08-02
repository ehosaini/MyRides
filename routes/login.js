require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const server_token = process.env.SERVER_TOKEN;
const redirect_uri = 'http://localhost:3000/api/callback';

/* Enpoints and URIs */
const tokenExchEndpoint = 'https://login.uber.com/oauth/v2/token';


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
   // params to post to /Token endpoint
    accessTokenParams = {
        client_secret,
        client_id,
        grant_type: 'authorization_code',
        redirect_uri,
        code: authCode,
        scope: 'profile history'
    }

    const strParams = querystring.stringify(accessTokenParams);

    axios.post(tokenExchEndpoint, strParams ).then(response => {
            if (response.status !== 200) {
                erroMessage = {
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data,
                }
                throw Error(erroMessage);
            }
            
            res.send(`Login successful with access token: ${JSON.stringify(response.data)}`);

        }).catch((e) => {
           res.status(400).send('ERROR! cannot access your data at this time.');
        });
    
});

/* Step 3: Get an access token from Uber token enpoint */

module.exports = router;