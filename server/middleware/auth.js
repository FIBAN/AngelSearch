const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const Angel = require('../models/angel');

module.exports.loggedIn = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://fiban.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://angel-search/',
    issuer: "https://fiban.eu.auth0.com/",
    algorithms: ['RS256']
});

module.exports.loggedInAngel = [module.exports.loggedIn, function (req, res, next) {
    Angel.getByAuthId(req.user.sub).then(angel => {
        if(angel) {
            req.angel = angel;
            next();
        }
        else {
            res.status(403).json({status: 403, message: "User not registered"});
        }
    });
}];

module.exports.loggedInAdmin = [module.exports.loggedIn, function (req, res, next) {
    if(req.user['https://angel-search/role'] === 'admin') {
        next();
    } else {
        res.status(403).json({status: 403, message: "Requires admin privileges"})
    }
}];

module.exports.ownsAngel = function (req, res, next) {
    if(req.angel && req.angel.id === req.params.angelId) {
        next();
    } else if (req.user && req.user['https://angel-search/role'] === 'admin') {
        next();
    } else {
        res.status(403).json({status: 403, message: 'Forbidden'});
    }
};

