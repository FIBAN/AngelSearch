"use strict";
const express = require('express');
const router = express.Router();
const Angel = require('../models/angel');
const Invitation = require('../models/invitation');
const auth = require('../middleware/auth');
const logger = require('../helpers/logger');

const absoluteAngelId = function (req, angel)  {
    return req.protocol + '://' + req.get('host') + '/api/angels/' + angel.id;
};

const angelAccessDenied = function (res) {
    res.status(403).json({status: 403, message: "Forbidden"});
};

router.get('/', auth.loggedInAngel, (req, res) => {
    Angel.all().then(angels => {
        const jsonAngels = angels.map(a => {
            a.href = absoluteAngelId(req, a);
            return a;
        });
        res.json(jsonAngels);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('List Angels', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/', auth.loggedInAdmin, (req, res) => {
    Angel.create(req.body).then((angel) => {
        logger(req.headers['x-request-id']).log('New Angel', angel);
        Invitation.create(angel.id)
            .then(invitation => logger(req.headers['x-request-id']).log('New Invitation', invitation))
            .catch(err => logger(req.headers['x-request-id']).error('New Invitation', err));
        res.status(201).json(angel);
    }).catch((err) => {
        logger(req.headers['x-request-id']).error('New Angel', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.get('/:angelId', auth.loggedInAngel, (req, res) => {
    Angel.get(req.params.angelId).then(angel => {
        if (!angel) {
            res.status(404).json({status: 404, message: 'Angel not found'});
        } else {
            angel.href = absoluteAngelId(req, angel);
            res.json(angel);
        }
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Get Angel', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.put('/:angelId', auth.loggedInAngel, (req, res) => {
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

    Angel.update(angel).then(updatedAngel => {
        logger(req.headers['x-request-id']).log('Update Angel', {changes: angel, current: updatedAngel});
        res.json(updatedAngel);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Update Angel', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.delete('/:angelId', auth.loggedInAdmin, (req, res) => {
    Angel.delete(req.params.angelId).then(() => {
        logger(req.headers['x-request-id']).log('Delete Angel', req.params.angelId);
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Delete Angel', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.get('/:angelId/invitations', auth.loggedInAngel, (req, res) => {
    if(req.angel.id !== req.params.angelId && req.user['https://angel-search/role'] !== 'admin') {
        angelAccessDenied(res);
        return;
    }

    Invitation.allByAngelId(req.params.angelId).then((invites) => {
        res.json(invites);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('List Angel Invitations', err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/:angelId/invitations', auth.loggedInAdmin, (req, res) => {
    Invitation.create(req.params.angelId).then((invitation) => {
        logger(req.headers['x-request-id']).log('New Invitation', invitation);
        res.status(201).json(invitation);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('New Invitation', err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;