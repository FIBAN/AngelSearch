"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../daos/startup');
const logger = require('../helpers/logger');

const absoluteStartupId = function (req, startup)  {
    return req.protocol + '://' + req.get('host') + '/api/startups/' + startup.id;
};


router.get('/', auth.loggedInAngel, (req, res) => {
    Startup.all().then(startups => {
        const jsonStartups = startups.map(startup => {
            startup.href = absoluteStartupId(req, startup);
            return startup;
        });
        res.json(jsonStartups);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('List Startups', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/', auth.loggedInAdmin, (req, res) => {
    Startup.create(req.body).then((startup) => {
        logger(req.headers['x-request-id']).log('New Startup', startup);
        startup.href = absoluteStartupId(req, startup);
        res.status(201).json(startup);
    }).catch((err) => {
        logger(req.headers['x-request-id']).error('New Startup', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.get('/:startupId', auth.loggedInAngel, (req, res) => {
    Startup.get(req.params.startupId).then(startup => {
        if (!startup) {
            res.status(404).json({status: 404, message: 'Startup not found'});
        } else {
            startup.href = absoluteStartupId(req, startup);
            res.json(startup);
        }
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Get Startup', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.put('/:startupId', auth.loggedInAdmin, (req, res) => {
    let startup = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            startup[key] = req.body[key];
        }
    }
    startup.id = req.params.startupId;

    Startup.update(startup).then((updatedStartup) => {
        logger(req.headers['x-request-id']).log('Update Startup', {changes: startup, current: updatedStartup});
        res.json(updatedStartup);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Update Startup', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.delete('/:startupId', auth.loggedInAdmin, (req, res) => {
    Startup.delete(req.params.startupId).then(() => {
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Delete Startup', err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;