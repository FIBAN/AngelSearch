"use strict";
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const auth = require('../middleware/auth');
const config = require('../config');
const logger = require('../helpers/logger');
const angelService = require('../services/angel-service');
const adminService = require('../services/admin-service');

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
router.use('/auth0', require('./auth0'));

router.get('/me', auth.requireScopes(['read:profile']), async (req, res, next) => {
    try {
        res.json(await angelService.getAngelById(req.user['https://angel-search/angelId']));
    } catch (err) {
        next(err);
    }
});

router.get('/me/resend-email', auth.authenticated, async (req, res, next) => {
    try {
        res.json(await adminService.resendVerificationEmail(req.user.sub));
    } catch (err) {
        next(err);
    }
});

router.use(function(req, res, next) {
    res.status(404).send({ status: 404, message: 'Not found' });
});

router.use(function (err, req, res, next) {
    switch (err.name) {
        case 'UnauthorizedError':
            res.status(401).send({ status: 401, message: 'Invalid access token'});
            return;
        case 'DUPLICATE_ANGEL_EMAIL':
        case 'INVITATION_WRONG_STATUS':
        case 'INVITATION_AUTH0_CONFLICT':
        case 'STARTUP_INVALID_LEAD_ANGEL':
        case 'DOCUMENT_INVALID_TYPE':
            res.status(400).send({ status: 400, message: err.message });
            return;
        case 'ANGEL_NOT_FOUND':
        case 'DOCUMENT_NOT_FOUND':
        case 'INVITATION_NOT_FOUND':
        case 'STARTUP_NOT_FOUND':
            res.status(404).send({ status: 404, message: err.message });
            return;
        default:
            logger(req.headers['x-request-id']).error('Uncaught Error', err);
            res.status(500).send({ status: 500, message: 'Internal server error' });
    }
});

module.exports = router;