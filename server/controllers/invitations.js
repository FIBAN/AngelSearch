"use strict";
const express = require('express');
const router = express.Router();
const Invitation = require('../models/invitation');
const Angel = require('../models/angel');
const auth = require('../middleware/auth');
const logger = require('../helpers/logger');

const absoluteInvitationId = function (req, invite)  {
    return req.protocol + '://' + req.get('host') + '/api/invitations/' + invite.id;
};

router.get('/', auth.loggedInAdmin, (req, res) => {

    Invitation.all().then(rows => {
        rows = rows.map(i => (i.href = absoluteInvitationId(req, i)) && i);
        res.json(rows);
    }).catch(err => {
        logger(req.headers['x-request-id']).error('List Invitations', err);
        res.status(500).json({status: 500, message: err});
    });

});

router.get('/:inviteId', (req, res) => {

    Invitation.get(req.params.inviteId).then(row => {
        if (!row) {
            res.status(404).json({status: 404, message: 'Invitation not found'});
        } else {
            row.href = absoluteInvitationId(req, row);
            res.json(row);
        }
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Get Invitation', err);
        res.status(500).json({status: 500, message: err});
    });

});

router.post('/:inviteId/accept', auth.authenticated, (req, res) => {
    Invitation.get(req.params.inviteId).then(invite => {
        if(!invite || invite.status !== 'pending') {
            res.status(404).json({status: 404, message: 'No pending invitation found'});
        } else {
            return Angel.linkAuth0Id(invite.angel_id, req.user.sub)
                .then(() => Invitation.markAccepted(req.params.inviteId))
                .then((invitation) => {
                    logger(req.headers['x-request-id']).log('Accept Invitation', invitation);
                    res.json(invitation)
                })
                .catch(err => Promise.reject({error: "Invite couldn't be accepted", cause: err}));
        }
    }).catch(err => {
        logger(req.headers['x-request-id']).error('Accept Invitation', err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;