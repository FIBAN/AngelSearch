"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const startupService = require('../services/startup-service');
const validator = require('../helpers/validator');

router.get('/', auth.requireScopes(['read:startups']), async (req, res, next) => {
    try {
        res.json(await startupService.listAllStartups());
    } catch (err) {
        next(err);
    }
});

router.post('/', auth.requireScopes(['write:startups']), async (req, res, next) => {
    try {
        const body = req.body;
        validator.assertNonEmptyString(body.lead_angel_id, 'lead_angel_id');
        validator.assertNonEmptyString(body.company_name, 'company_name');
        validator.assertNonEmptyString(body.oneliner, 'oneliner');
        validator.assertNonEmptyString(body.oneliner, 'industry');
        validator.assertNonEmptyString(body.website, 'website');
        validator.assertNonEmptyString(body.city, 'city');
        validator.assertNonEmptyString(body.country, 'country');
        validator.assertNonEmptyString(body.entrepreneur_name, 'entrepreneur_name');
        validator.assertNonEmptyString(body.entrepreneur_email, 'entrepreneur_email');
        validator.assertNonEmptyString(body.entrepreneur_phone, 'entrepreneur_phone');
        validator.assertNonEmptyString(body.round_size_and_open_tickets, 'round_size_and_open_tickets');
        validator.assertNonEmptyString(body.valuation, 'valuation');
        validator.assertNonEmptyString(body.committed_percentage, 'committed_percentage');
        validator.assertNonEmptyString(body.pitch_deck_link, 'pitch_deck_link');
    } catch (err) {
        res.status(400).json({status: 400, message: err.message});
        return
    }

    try {
        res.status(201).json(await startupService.createStartup(req.body));
    } catch (err) {
        next(err);
    }
});

router.get('/:startupId', auth.requireScopes(['read:startups']), async (req, res, next) => {
    try {
        res.json(await startupService.getStartupById(req.params.startupId));
    } catch (err) {
        next(err);
    }
});

router.put('/:startupId', auth.requireScopes(['write:startups']), async (req, res, next) => {
    let changes = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            changes[key] = req.body[key];
        }
    }
    changes.id = req.params.startupId;

    try {
        res.json(await startupService.updateStartup(changes))
    } catch (err) {
        next(err);
    }
});

router.delete('/:startupId', auth.requireScopes(['write:startups']), async (req, res, next) => {
    try {
        await startupService.deleteStartup(req.params.startupId);
        res.json({status: 200, message: 'Deleted'});
    } catch (err) {
        next(err);
    }
});

module.exports = router;