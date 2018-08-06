const express = require('express');
const router = express.Router();

/* Show users history in tabular form. */
router.get('/', function (req, res, next) {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            res.redirect('/');
        }
        res.redirect('/');
    })
});





module.exports = router;