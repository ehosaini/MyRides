require('dotenv').config();
const express = require('express');
const router = express.Router();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const server_token = process.env.SERVER_TOKEN;

const tokenExchEndpoint = null;

/* Redirect user to Uber Authorization URL */
router.get('/api/login', (req, res, next) => {
    const authURL = `https://login.uber.com/oauth/v2/authorize?client_id=${client_id}&response_type=code`;
    console.log(authURL);
    res.redirect(authURL);

});

/* Recieve authorization code from Uber after user grants
permission */
router.get('/api/callback', function (req, res, next) {
    const authCode = req.query.code;
    res.send(`Login successful with Auth Code: ${authCode}`);
});


module.exports = router;