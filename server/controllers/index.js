"use strict";
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const auth = require('../middleware/auth');
const config = require('../config');
const logger = require('../helpers/logger');

morgan.token('x-request-id', (req, res) => { return req.headers['x-request-id']});
morgan.token('jwt-sub', (req, res) => { return req.user && req.user.sub});

if(config.env !== 'test') {
    router.use(morgan(':remote-addr :jwt-sub [:date[clf]] (:x-request-id) ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
}

router.use('/angels', require('./angels'));
router.use('/invitations', require('./invitations'));
router.use('/startups', require('./startups'));
router.use('/documents', require('./documents'));
router.use('/admin', require('./admin'));

router.get('/me', auth.loggedInAngel, (req, res) => {
    res.json(req.angel);
});

router.use(function(req, res, next) {
    res.status(404).send({ status: 404, message: 'Not found' });
});

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ status: 401, message: 'Invalid access token'});
        return
    }
    logger(req.headers['x-request-id']).error('Uncaught Error', err);
    res.status(500).send({ status: 500, message: 'Internal server error', error: err });
});

module.exports = router;