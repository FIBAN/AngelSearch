"use strict";
const config = require('../../config');
const AuthenticationClient = require('auth0').AuthenticationClient;

const auth0 = new AuthenticationClient({
    domain: config.auth0.domain,
    clientId: config.auth0.clientId,
    clientSecret: config.auth0.secret,
});

module.exports.getAccessToken = function () {
    return auth0.oauth.passwordGrant({
        username: config.auth0.test_user.username,
        password: config.auth0.test_user.password,
        client_secret: config.auth0.secret
    }).then(response => response.access_token);
};
