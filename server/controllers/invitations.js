const express = require('express');
const router = express.Router();
const Invitation = require('../models/invitation');

const absoluteInvitationId = function (req, invite)  {
    return req.protocol + '://' + req.get('host') + '/api/invitations/' + invite.id;
};

router.get('/', (req, res) => {

    Invitation.all().then(rows => {
        rows = rows.map(i => (i.href = absoluteInvitationId(req, i)) && i);
        res.json(rows);
    }).catch(err => {
        console.error(err);
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
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

module.exports = router;