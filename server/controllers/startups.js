"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const startupService = require('../services/startup-service');
const logger = require('../helpers/logger');
const validator = require('../helpers/validator');

router.get('/', auth.loggedInAngel, async (req, res) => {
    try {
        res.json(await startupService.listAllStartups());
    } catch (err) {
        logger(req.headers['x-request-id']).error('List Startups', err);
        res.status(500).json({status: 500, message: err.message});
    }
});

router.post('/', auth.loggedInAdmin, async (req, res) => {
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
        switch (err.name) {
            case 'STARTUP_INVALID_LEAD_ANGEL':
                res.status(400).json({status: 400, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Create Startup', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.get('/:startupId', auth.loggedInAngel, async (req, res) => {
    try {
        res.json(await startupService.getStartupById(req.params.startupId));
    } catch (err) {
        switch (err.name) {
            case 'STARTUP_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Get Startup', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.put('/:startupId', auth.loggedInAdmin, async (req, res) => {
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
        switch (err.name) {
            case 'STARTUP_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            case 'STARTUP_INVALID_LEAD_ANGEL':
                res.status(400).json({status: 400, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Update Startup', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.delete('/:startupId', auth.loggedInAdmin, async (req, res) => {
    try {
        await startupService.deleteStartup(req.params.startupId);
        res.json({status: 200, message: 'Deleted'});
    } catch (err) {
        switch (err.name) {
            case 'STARTUP_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Delete Startup', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

module.exports = router;