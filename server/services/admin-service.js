"use strict";
const auth0 = require('./auth0-management');
const Auth0Users = require('../daos/auth0-users');

const USERS_PER_PAGE = 100;

module.exports.getUsers = function () {
    return auth0.client().then(client => {
        return Promise.all([
            aggregateUsers(client, [], 0),
            Auth0Users.all()
        ]).then(([usersFromAuth0, usersFromDB]) => {
            return usersFromAuth0.map(user => {
                const dbMatch = usersFromDB.find(u => u.id === user.user_id);
                user.angel_id = dbMatch && dbMatch.angel_id;
                return user;
            });
        });
    });
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