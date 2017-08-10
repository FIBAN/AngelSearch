"use strict";
require('dotenv').config();


exports.getUsers = function () {
    return new Promise((success, error) => {

        const AuthenticationClient = require('auth0').AuthenticationClient;

        const auth0 = new AuthenticationClient({
            domain: 'fiban.eu.auth0.com',
            clientId: process.env.AUTH0_CLIENTID,
            clientSecret: process.env.AUTH0_SECRET,
        });

        const ManagementClient = require('auth0').ManagementClient;


        auth0.clientCredentialsGrant({
            audience: 'https://fiban.eu.auth0.com/api/v2/'
        }, function (err, response) {
            if (err) {
                console.error("didn't get credentials", err);
                return;
            }
            console.log(response.access_token);
            const management = new ManagementClient({
                token: response.access_token,
                domain: 'fiban.eu.auth0.com'
            });
            management.getUsers().then((users) => {
                console.log("users", users);
                success(users);
            }).catch(err => error(err));
        });
    });

};
