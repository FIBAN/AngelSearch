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

const canModify = function (user, angelId, cb) {
    Angel.get(angelId, (err, angel) => {
        if(err || !angel) {
            cb(false);
        } else {
            cb(angel.auth0_id === user)
        }
    });
};

module.exports.canModify = function (req, res, next) {
    const angelId = req.params.angelId;
    const userId = req.user.sub;
    canModify(userId, angelId, (success) => {
        if(success) next();
        else res.status(403).json({status: 403, message: 'Forbidden'});
    });
};