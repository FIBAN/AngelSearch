"use strict";
const express = require('express');
const router = express.Router();
const angelService = require('../services/angel-service');
const invitationService = require('../services/invitation-service');
const auth = require('../middleware/auth');
const logger = require('../helpers/logger');
const assert = require('assert');

const angelAccessDenied = function (res) {
    res.status(403).json({status: 403, message: "Forbidden"});
};

router.get('/', auth.loggedInAngel, async (req, res) => {
    try {
        res.json(await angelService.listAllAngels());
    } catch (err) {
        logger(req.headers['x-request-id']).error('List Angels:', err);
        res.status(500).json({status: 500, message: err.message});
    }
});


router.post('/', auth.loggedInAdmin, async (req, res) => {
    try {
        const body = req.body;
        assert.equal(typeof (body.email), 'string', 'parameter "email" must be string');
        assert.ok(body.email, 'parameter "email" can\'t be empty');
        assert.equal(typeof (body.first_name), 'string', 'parameter "first_name" must be string');
        assert.ok(body.first_name, 'parameter "first_name" can\'t be empty');
        assert.equal(typeof (body.last_name), 'string', 'parameter "last_name" must be string');
        assert.ok(body.last_name, 'parameter "last_name" can\'t be empty');
    } catch (err) {
        res.status(400).json({status: 400, message: err.message});
        return
    }

    try {
        res.status(201).json(await angelService.createNewAngel(req.body));
    } catch (err) {
        switch (err.name) {
            case 'DUPLICATE_ANGEL_EMAIL':
                res.status(400).json({status: 400, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('New Angel:', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.get('/:angelId', auth.loggedInAngel, async (req, res) => {
    try {
        res.json(await angelService.getAngelById(req.params.angelId));
    } catch (err) {
        switch (err.name) {
            case 'ANGEL_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Get Angel:', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.put('/:angelId', auth.loggedInAngel, async (req, res) => {
    if(req.angel.id !== req.params.angelId && req.user['https://angel-search/role'] !== 'admin') {
        angelAccessDenied(res);
        return;
    }

    let angel = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            angel[key] = req.body[key];
        }
    }
    angel.id = req.params.angelId;

    try {
        res.json(await angelService.updateAngel(angel));
    } catch (err) {
        switch (err.name) {
            case 'ANGEL_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            case 'DUPLICATE_ANGEL_EMAIL':
                res.status(400).json({status: 400, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Update Angel:', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.delete('/:angelId', auth.loggedInAdmin, async (req, res) => {
    try {
        await angelService.deleteAngel(req.params.angelId);
        res.json({status: 200, message: 'Deleted'});
    } catch (err) {
        switch (err.name) {
            case 'ANGEL_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Delete Angel:', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.get('/:angelId/invitations', auth.loggedInAngel, async (req, res) => {
    if(req.angel.id !== req.params.angelId && req.user['https://angel-search/role'] !== 'admin') {
        angelAccessDenied(res);
        return;
    }

    try {
        await angelService.getAngelById(req.params.angelId);
        res.json(await invitationService.listAllInvitationsByAngelId(req.params.angelId));
    } catch (err) {
        switch (err.name) {
            case 'ANGEL_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('List Angel Invitations', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.post('/:angelId/invitations', auth.loggedInAdmin, async (req, res) => {
    try {
        await angelService.getAngelById(req.params.angelId);
        res.status(201).json(await invitationService.createNewInvitation(req.params.angelId));
    } catch (err) {
        switch (err.name) {
            case 'ANGEL_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('New Invitation', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

module.exports = router;