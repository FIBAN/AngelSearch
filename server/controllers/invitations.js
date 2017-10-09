"use strict";
const express = require('express');
const router = express.Router();
const invitationService = require('../services/invitation-service');
const auth = require('../middleware/auth');

router.get('/', auth.loggedInAdmin, async (req, res, next) => {
    try {
        res.json(await invitationService.listAllInvitations());
    } catch (err) {
        next(err);
    }
});

router.get('/:inviteId', async (req, res, next) => {
    try {
        res.json(await invitationService.getInvitationById(req.params.inviteId));
    } catch (err) {
        next(err);
    }
});

router.post('/:inviteId/accept', auth.authenticated, async (req, res, next) => {
    try {
        const invitation = await invitationService.acceptInvitation(req.params.inviteId, req.user.sub);
        res.json(invitation);
    } catch (err) {
        next(err);
    }
});

module.exports = router;