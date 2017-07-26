'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite3');

const Angels = require('./angels');
const angels = new Angels(db);

const admin = require('./admin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const randomUUID = () => uuidv4(null, new Buffer(16), 0).toString('base64');

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



app.put('/api/angels/:angelId', (req, res) => {

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

app.delete('/api/angels/:angelId', (req, res) => {

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
    admin.getUsers().then((users) => res.json({users: users}))
        .catch((error) => res.json({status: 500, error: error}).status(500));
});

app.get('/api/dbtest', (req, res) => {

    db.serialize(function () {
        db.run("CREATE TABLE lorem (info TEXT)", (err) => console.log(err));

        let stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            console.log(row.id + ": " + row.info);
        });
    });

    res.json({msg: "Done"});
});

const initDatabase = function () {

    db.run("CREATE TABLE angels (" +
        "id TEXT," +
        "auth0_id TEXT," +
        "first_name TEXT," +
        "last_name TEXT," +
        "email TEXT," +
        "phone TEXT," +
        "city TEXT," +
        "country TEXT," +
        "bio TEXT" +
        ");", (err) => console.log(err));

};

initDatabase();

app.listen(3001);
console.log('Listening on localhost:3001');