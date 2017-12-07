"use strict";
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const config = require('../config');

module.exports.authenticated = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://" + config.auth0.domain + "/.well-known/jwks.json"
    }),
    audience: config.auth0.audience,
    issuer: "https://" + config.auth0.domain + "/",
    algorithms: ['RS256']
});

module.exports.loggedInAdmin = [module.exports.authenticated, function (req, res, next) {
    if(req.user['https://angel-search/role'] === 'admin') {
        next();
    } else {
        res.status(403).json({status: 403, message: "Requires admin privileges"})
    }
}];

module.exports.requireScopes = function (requiredScopes) {
    return [module.exports.authenticated, function (req, res, next) {
        for(const requiredScope of requiredScopes) {
            const userScopes = req.user.scope.split(' ').map(s => s.trim().toLowerCase());
            const scopeNotInUserScopes = userScopes.indexOf(requiredScope.toLowerCase()) === -1;
            if(scopeNotInUserScopes) {
                res.status(403).json({status: 403, message: `Requires "${requiredScope}" scope`});
                return;
            }
        }
        next();
    }];
};

