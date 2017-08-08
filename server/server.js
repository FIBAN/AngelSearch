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
        else res.status(403).json({status: 403, message: 'Forbidden'});
    })
};

const absoluteAngelId = function (req, angel)  {
    return req.protocol + '://' + req.get('host') + '/api/angels/' + angel.id;
};

app.get('/api/angels', (req, res) => {

    angels.list().then(rows => {
        rows = rows.map(a => (a.href = absoluteAngelId(req, a)) && a);
        res.json(rows);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

app.post('/api/angels', (req, res) => {

    angels.create(req.body, (err) => {
        if(err) {
            console.error(err);
            res.status(500).json({status: 500, message: err});
        } else {
            res.status(201).json({status: 201, message: 'Created'});
        }
    });

});

app.get('/api/angels/:angelId', (req, res) => {

    angels.forAngelId(req.params.angelId).then(row => {
        if (!row) {
            res.status(404).json({status: 404, message: 'Angel not found'});
        } else {
            row.href = absoluteAngelId(req, row);
            res.json(row);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});



app.put('/api/angels/:angelId', authCheck, modifyCheck, (req, res) => {

    let angel = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            angel[key] = req.body[key];
        }
    }
    angel.id = req.params.angelId;
    angels.update(angel).then(() => {
        res.json({status: 200, message: 'Updated'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

app.delete('/api/angels/:angelId', authCheck, modifyCheck, (req, res) => {

    angels.delete(req.params.angelId).then(() => {
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

app.get('/api/me', authCheck, (req, res) => {

    angels.forAuthId(req.user.sub).then(row => {
        row.href = absoluteAngelId(req, row);
        res.json(row);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

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