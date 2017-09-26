"use strict";
const fs = require('fs');
const db = require('../../models/db');

function runSqlScript(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if(err) {
                console.error(`Error while reading ${filename}`, err);
                reject(err);
            } else {
                db.query(data)
                    .then(() => resolve())
                    .catch(err => {
                        console.error(`Error while executing ${filename}`, err);
                        reject(err);
                    });
            }
        });
    });
}

module.exports.runSqlScript = runSqlScript;

module.exports.createTestDB = function () {
    return runSqlScript('./scripts/create-schema.sql');
};

module.exports.destroyTestDB = function () {
    return runSqlScript('./scripts/destroy-schema.sql');
};