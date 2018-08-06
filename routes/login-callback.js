const express = require('express');
const router = express.Router();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const server_token = process.env.SERVER_TOKEN;

const tokenExchEndpoint = null;

router.get('/', function (req, res, next) {
    // Get Authorization code returned by Uber's OAuth2 process
    const authCode = req.query.code;
    
    res.send(`Login successful with Auth Code: ${authCode}`);
});

module.exports = router;