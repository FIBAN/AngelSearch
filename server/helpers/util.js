"use strict";
const uuidv4 = require('uuid/v4');

module.exports.randomUUID = () => uuidv4(null, new Buffer(16), 0).toString('base64').replace(/\//g,'_');