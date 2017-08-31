const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Industry = require('../models/industry');

router.use('/angels', require('./angels'));
router.use('/invitations', require('./invitations'));
router.use('/admin', require('./admin'));

router.get('/me', auth.loggedInAngel, (req, res) => {
    const angel = req.angel;
    return Industry.allByAngelId(angel.id).then(industries => {
        angel.industries = industries.map(i => i.industry);
        res.json(angel);
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