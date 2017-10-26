"use strict";
const db = require('./db');

module.exports.all = () => {
    return db.query('SELECT * FROM auth0_users').then(res => res.rows);
};