const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.get('/users', (req, res) => {
    Admin.getUsers()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json({status: 500, error: error}));
});

module.exports = router;