"use strict";
const express = require('express');
const router = express.Router();
const adminService = require('../services/admin-service');
const auth = require("../middleware/auth");

router.get('/users', auth.loggedInAdmin, (req, res) => {
    adminService.getUsers()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json({status: 500, error: error}));
});

module.exports = router;