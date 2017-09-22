"use strict";
require('../config');

const AuthenticationClient = require('auth0').AuthenticationClient;

const ManagementClient = require('auth0').ManagementClient;

module.exports.client = function () {
    const auth0 = new AuthenticationClient({
        domain: config.auth0.domain,
        clientId: config.auth0.clientId,
        clientSecret: config.auth0.secret,
    });

    return auth0.clientCredentialsGrant({
        audience: 'https://' + config.auth0.domain + '/api/v2/'
    }).then(response => {
        return new ManagementClient({
            token: response.access_token,
            domain: config.auth0.domain
        });
    }).catch(err => {
        console.error("didn't get auth0 credentials", err);
    });
};
