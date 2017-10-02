"use strict";
const auth0 = require('./auth0-management');


exports.getUsers = function () {
    return auth0.client().then(client => client.getUsers());
};

exports.setUserAngelId = function (auth0Id, angelId) {
    return auth0.client().then(client => client.updateAppMetadata({id: auth0Id}, {angel_id: angelId}));
};
