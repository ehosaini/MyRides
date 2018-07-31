require('dotenv').config();
const express = require('express');
const router = express.Router();

const client_id = process.env.CLIENT_ID;

/* Redirect to Uber Authorization URL */
router.get('/', (req, res, next) => {
    const authURL = `https://login.uber.com/oauth/v2/authorize?client_id=${client_id}&response_type=code`;
    console.log(authURL);
    res.redirect(authURL);

});

module.exports = router;