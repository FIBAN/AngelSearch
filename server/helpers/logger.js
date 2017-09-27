"use strict";

const config = require('../config');

module.exports = function(requestId) {
    return {
        log: function (message, ...args) {
            if(config.env !== 'test') {
                console.log(`(${requestId}):`, message, ...args);
            }
        },
        error: function (message, ...args) {
            if(config.env !== 'test') {
                console.error(`[ERROR] (${requestId}):`, message, ...args);
            }
        }
    };
};