"use strict";
require('dotenv').config();

const AuthenticationClient = require('auth0').AuthenticationClient;

const ManagementClient = require('auth0').ManagementClient;

module.exports.client = function () {
    const auth0 = new AuthenticationClient({
        domain: 'fiban.eu.auth0.com',
        clientId: process.env.AUTH0_CLIENTID,
        clientSecret: process.env.AUTH0_SECRET,
    });

    return auth0.clientCredentialsGrant({
        audience: 'https://fiban.eu.auth0.com/api/v2/'
    }).then(response => {
        return new ManagementClient({
            token: response.access_token,
            domain: 'fiban.eu.auth0.com'
        });
    }).catch(err => {
        console.error("didn't get auth0 credentials", err);
    });
};
