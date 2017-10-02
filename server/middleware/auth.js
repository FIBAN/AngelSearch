"use strict";
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const https = require('https');

const Angel = require('../daos/angel');
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

const getProfile = function (req) {
    return new Promise((res, rjt) => {
        https.get({
            host: config.auth0.domain,
            path: '/userinfo',
            headers: {
                'Authorization': req.headers.authorization
            }
        }, (auth0res) => {
            let body = '';

            auth0res.on('data', (chunk) => body += chunk);

            auth0res.on('end', () => {
                res(JSON.parse(body));
            })
        }).on('error', rjt);
    });
};

module.exports.loggedInAngel = [module.exports.authenticated, function (req, res, next) {
    Angel.getByAuthId(req.user.sub).then(angel => {
        if(angel) {
            req.angel = angel;
            next();
        }
        else {
            getProfile(req).then(profile => {
                Angel.getByEmail(profile.email).then(angel => {
                    if (angel) {
                        if(!profile.email_verified) {
                            res.status(403).json({status: 403, email_verified: false, message: "Email needs verification"})
                        } else {
                            req.angel = angel;
                            Angel.linkAuth0Id(angel.id, req.user.sub).then(() => next()).catch(() => next());
                        }
                    }
                    else {
                        res.status(403).json({status: 403, message: "Registration needed"});
                    }
                }).catch(err => res.status(500).json({
                    status: 500,
                    message: "Couldn't retrieve angel for email",
                    error: err
                }));
            }).catch(err => res.status(500).json({
                status: 500,
                message: "Couldn't retrieve profile",
                error: err
            }));
        }
    }).catch(err => res.status(500).json({
        status: 500,
        message: "Couldn't retrieve angel for JWT",
        error: err
    }));
}];

module.exports.loggedInAdmin = [module.exports.authenticated, function (req, res, next) {
    if(req.user['https://angel-search/role'] === 'admin') {
        next();
    } else {
        res.status(403).json({status: 403, message: "Requires admin privileges"})
    }
}];

