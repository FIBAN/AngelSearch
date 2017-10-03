"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const startupService = require('../services/startup-service');
const logger = require('../helpers/logger');

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