"use strict";
const express = require('express');
const router = express.Router();
const angelService = require('../services/angel-service');
const invitationService = require('../services/invitation-service');
const validator = require('../helpers/validator');

router.get('/angelid', async (req, res, next) => {
    try {
        const angel = await angelService.getAngelByEmail(req.query.email);
        res.json({email: angel.email, angelId: angel.id});
    } catch (err) {
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const body = req.body;
        validator.assertNonEmptyString(body.invitation_id, 'invitation_id');
        validator.assertNonEmptyString(body.auth0_id, 'auth0_id');
    } catch (err) {
        res.status(400).json({status: 400, message: err.message});
        return
    }
   try {
       const acceptedInvitation = await invitationService.acceptInvitation(req.body.invitation_id, req.body.auth0_id);
       res.json(acceptedInvitation);
   } catch (err) {
        next(err);
   }
});


module.exports = router;