"use strict";
const auth0 = require('./auth0-management');

const USERS_PER_PAGE = 100;

module.exports.getUsers = function () {
    return auth0.client().then(client => aggregateUsers(client, [], 0));
};

function aggregateUsers(client, results, page) {
    return client.getUsers({
        per_page: USERS_PER_PAGE,
        page: page,
        include_totals: true
    }).then(response => {
        if(response.length < 1) {
            return Promise.resolve(results);
        }
        else if(response.length < USERS_PER_PAGE) {
            return Promise.resolve([...results, ...response.users]);
        }
        else {
            return aggregateUsers(client, [...results, ...response.users], page + 1);
        }
    })
}

module.exports.resendVerificationEmail = async (auth0Id) => {
    return auth0.client().then(client => client.sendEmailVerification({user_id: auth0Id}));
};