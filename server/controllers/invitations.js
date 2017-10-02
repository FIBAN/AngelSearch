"use strict";
const express = require('express');
const router = express.Router();
const invitationService = require('../services/invitation-service');
const auth = require('../middleware/auth');
const logger = require('../helpers/logger');

router.get('/', auth.loggedInAdmin, async (req, res) => {
    try {
        res.json(await invitationService.listAllInvitations());
    } catch (err) {
        logger(req.headers['x-request-id']).error('List Invitations', err);
        res.status(500).json({status: 500, message: err.message});
    }
});

router.get('/:inviteId', async (req, res) => {
    try {
        res.json(await invitationService.getInvitationById(req.params.inviteId));
    } catch (err) {
        switch (err.name) {
            case 'INVITATION_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Get Invitation', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.post('/:inviteId/accept', auth.authenticated, async (req, res) => {
    try {
        const invitation = await invitationService.acceptInvitation(req.params.inviteId, req.user.sub);
        res.json(invitation);
    } catch (err) {
        switch (err.name) {
            case 'INVITATION_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            case 'INVITATION_WRONG_STATUS':
            case 'INVITATION_AUTH0_CONFLICT':
                res.status(400).json({status: 400, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Accept Invitation:', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

module.exports = router;