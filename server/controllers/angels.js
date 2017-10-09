"use strict";
const express = require('express');
const router = express.Router();
const angelService = require('../services/angel-service');
const invitationService = require('../services/invitation-service');
const auth = require('../middleware/auth');
const validator = require('../helpers/validator');

const angelAccessDenied = function (res) {
    res.status(403).json({status: 403, message: "Forbidden"});
};

router.get('/', auth.loggedInAngel, async (req, res, next) => {
    try {
        res.json(await angelService.listAllAngels());
    } catch (err) {
        next(err);
    }
});


router.post('/', auth.loggedInAdmin, async (req, res, next) => {
    try {
        const body = req.body;
        validator.assertNonEmptyString(body.email, 'email');
        validator.assertNonEmptyString(body.first_name, 'first_name');
        validator.assertNonEmptyString(body.last_name, 'last_name');
    } catch (err) {
        res.status(400).json({status: 400, message: err.message});
        return
    }

    try {
        res.status(201).json(await angelService.createNewAngel(req.body));
    } catch (err) {
        next(err);
    }
});

router.get('/:angelId', auth.loggedInAngel, async (req, res, next) => {
    try {
        res.json(await angelService.getAngelById(req.params.angelId));
    } catch (err) {
        next(err);
    }
});

router.put('/:angelId', auth.loggedInAngel, async (req, res, next) => {
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
        next(err);
    }
});

router.delete('/:angelId', auth.loggedInAdmin, async (req, res, next) => {
    try {
        await angelService.deleteAngel(req.params.angelId);
        res.json({status: 200, message: 'Deleted'});
    } catch (err) {
        next(err);
    }
});

router.get('/:angelId/invitations', auth.loggedInAngel, async (req, res, next) => {
    if(req.angel.id !== req.params.angelId && req.user['https://angel-search/role'] !== 'admin') {
        angelAccessDenied(res);
        return;
    }

    try {
        await angelService.getAngelById(req.params.angelId);
        res.json(await invitationService.listAllInvitationsByAngelId(req.params.angelId));
    } catch (err) {
        next(err);
    }
});

router.post('/:angelId/invitations', auth.loggedInAdmin, async (req, res, next) => {
    try {
        await angelService.getAngelById(req.params.angelId);
        res.status(201).json(await invitationService.createNewInvitation(req.params.angelId));
    } catch (err) {
        next(err);
    }
});

module.exports = router;