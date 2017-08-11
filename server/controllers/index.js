const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Angel = require('../models/angel');

router.use('/angels', require('./angels'));
router.use('/invitations', require('./invitations'));
router.use('/admin', require('./admin'));

router.get('/me', auth.loggedIn, (req, res) => {

    Angel.getByAuthId(req.user.sub).then(row => {
        res.json(row);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

router.use(function(req, res, next) {
    res.status(404).send({ status: 404, message: 'Not found' });
});

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ status: 401, message: 'Invalid access token'});
        return
    }
    console.error(err.stack);
    res.status(500).send({ status: 500, message: 'Internal server error', error: err });
});

module.exports = router;