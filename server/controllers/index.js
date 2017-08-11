const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Angel = require('../models/angel');

router.use('/angels', require('./angels'));
router.use('/invitations', require('./invitations'));
router.use('/admin', require('./admin'));

router.get('/me', auth.loggedIn, (req, res) => {

    Angel.getByAuthId(req.user.sub).then(row => {
        row.href = absoluteAngelId(req, row);
        res.json(row);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

module.exports = router;