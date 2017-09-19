"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../models/startup');

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
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/', auth.loggedInAdmin, (req, res) => {
    Startup.create(req.body).then((startup) => {
        startup.href = absoluteStartupId(req, startup);
        res.status(201).json(startup);
    }).catch((err) => {
        console.error(err);
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
        console.error(err);
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

    Startup.update(startup).then(() => {
        res.json({status: 200, message: 'Updated'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.delete('/:startupId', auth.loggedInAdmin, (req, res) => {
    Startup.delete(req.params.startupId).then(() => {
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;