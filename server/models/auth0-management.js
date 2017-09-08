"use strict";
require('dotenv').config();

const AuthenticationClient = require('auth0').AuthenticationClient;

const ManagementClient = require('auth0').ManagementClient;

module.exports.client = function () {
    const auth0 = new AuthenticationClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENTID,
        clientSecret: process.env.AUTH0_SECRET,
    });

    return auth0.clientCredentialsGrant({
        audience: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/'
    }).then(response => {
        return new ManagementClient({
            token: response.access_token,
            domain: process.env.AUTH0_DOMAIN
        });
    }).catch(err => {
        console.error("didn't get auth0 credentials", err);
    });
};
