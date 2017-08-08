'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const angels = require('./src/angels');

const admin = require('./src/admin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
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
   angels.forAngelId(angelId, (err, angel) => {
       if(err || !angel) {
           cb(false);
       } else {
           cb(angel.auth0_id === user)
       }
   });
};

const modifyCheck = function (req, res, next) {
    const angelId = req.params.angelId;
    const userId = req.user.sub;
    canModify(userId, angelId, (success) => {
        if(success) next();
        else res.json({status: 403, message: 'Forbidden'}).status(403)
    })
};

app.get('/api/angels', (req, res) => {

    angels.list((err, rows) => {
        if(err) {
            console.error(err);
            res.json({status: 500, message: err}).status(500);
        } else {
            res.json(rows);
        }
    });

});

app.post('/api/angels', (req, res) => {

    angels.create(req.body, (err) => {
        if(err) {
            console.error(err);
            res.json({status: 500, message: err}).status(500);
        } else {
            res.json({status: 201, message: 'Created'});
        }
    });

});

app.get('/api/angels/:angelId', (req, res) => {

    angels.forAngelId(req.params.angelId,
        (err, row) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else if (!row) {
                res.json({status: 404, message: 'Angel not found'}).status(404);
            } else {
                res.json(row);
            }
        }
    );

});



app.put('/api/angels/:angelId', authCheck, modifyCheck, (req, res) => {

    let angel = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            angel[key] = req.body[key];
        }
    }
    angel.id = req.params.angelId;
    angels.update(angel, (err) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json({status: 200, message: 'Updated'});
            }
        }
    );

});

app.delete('/api/angels/:angelId', authCheck, modifyCheck, (req, res) => {

    angels.delete( req.params.angelId, (err) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json({status: 200, message: 'Deleted'});
            }
        }
    );

});

app.get('/api/me', authCheck, (req, res) => {

    angels.forAuthId( req.user.sub, (err, row) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json(row);
            }
        }
    );

});

app.get('/api/test', authCheck, (req, res) => {
    res.json(req.user);
});

app.get('/api/admin/users', (req, res) => {
    admin.getUsers().then((users) => res.json(users))
        .catch((error) => res.json({status: 500, error: error}).status(500));
});

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const listener = app.listen(process.env.PORT || 3001);
const address = listener.address();
const host = address.host;
const port = address.port;
console.log('Listening on ' + host + ':' + port);