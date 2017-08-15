const express = require('express');
const router = express.Router();
const Invitation = require('../models/invitation');
const Angel = require('../models/angel');
const auth = require('../middleware/auth');

const absoluteInvitationId = function (req, invite)  {
    return req.protocol + '://' + req.get('host') + '/api/invitations/' + invite.id;
};

router.get('/', auth.loggedInAngel, (req, res) => {

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

router.post('/:inviteId/accept', auth.loggedIn, (req, res) => {
    Invitation.markAccepted(req.params.inviteId).then(updated => {
        if(!updated) {
            res.status(404).json({status: 404, message: 'No pending invitation found'})
        } else {
            return Invitation.get(req.params.inviteId)
                .then(invite => Angel.linkAuth0Id(invite.angel_id, req.user.sub))
                .then(res.json({status: 200, message: 'Success'}));
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;