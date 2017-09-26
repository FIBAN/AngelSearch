"use strict";
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const testDB = require('../test_helpers/db');
const testAuth0 = require('../test_helpers/auth0');

describe("Angel Search API Integration Tests", function () {

    var auth0Token;

    // Initialize test database and get an auth0 token for test user
    before(function (done) {
        const dbSetup = testDB.createTestDB()
            .then(() => testDB.runSqlScript('./scripts/angels-test-data.sql'));

        const auth0TokenSetup = testAuth0.getAccessToken().then(token => auth0Token = token);

        Promise.all([dbSetup, auth0TokenSetup])
            .then(() => done())
            .catch(err => {
                console.error('Test initialization error', err);
                done(err);
            });
    });

    // Drop test database
    after(function (done) {
        testDB.destroyTestDB()
            .then(() => done())
            .catch(err => {
                console.error('Error when destroying test database', err);
                done(err);
            });
    });

    describe('#GET /api/angels', function () {
       it('should get all angels', function (done) {
           request(app)
               .get('/api/angels')
               .set('Authorization', 'Bearer ' + auth0Token)
               .end(function(err, res) {
                   expect(res.statusCode).to.equal(200);
                   expect(res.body).to.be.an('array');
                   expect(res.body.length).to.equal(2);
                   done();
               });
       });
    });

    describe('#GET /api/angels/:angelId', function () {

        const angelId = 'hQyM4YDXQ_qIC2kdFfzVEQ==';
        const nonExistentAngelId = 'covfefe';

        it('should return single angel', function (done) {
            request(app)
                .get('/api/angels/' + angelId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(angelId);
                    done();
                });
        });

        it('should return 404 if no angel exists with given id', function(done) {
            request(app)
                .get('/api/angels/' + nonExistentAngelId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

    describe('#POST /api/angels', function () {
        let newAngelId;

        const newAngel = {
            first_name: "Erkki",
            last_name: "Enkeli",
            email: "erkki.enkeli@example.com"
        };

        it('should create new angel', function (done) {
            request(app)
                .post('/api/angels')
                .send(newAngel)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.first_name).to.equal(newAngel.first_name);
                    expect(res.body.last_name).to.equal(newAngel.last_name);
                    expect(res.body.email).to.equal(newAngel.email);
                    newAngelId = res.body.id;
                    done();
                });
        });

        it('new angel should be queryable', function (done) {
            request(app)
                .get('/api/angels/' + newAngelId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(newAngelId);
                    done();
                });
        });
    });

    describe('#PUT /api/angels/:angelId', function () {

        const angelId = 'hQyM4YDXQ_qIC2kdFfzVEQ==';
        const newName = {first_name: "Kekko", last_name: "Koe"};

        it('should allow changing angel name', function (done) {
            request(app)
                .put('/api/angels/' + angelId)
                .send(newName)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(angelId);
                    expect(res.body.first_name).to.equal(newName.first_name);
                    expect(res.body.last_name).to.equal(newName.last_name);
                    done();
                });
        });
    });

    describe('#DELETE /api/angels/:angelId', function () {
        const angelId = 'WvaGqpLbRX+UXeLc8KDkNg==';

        it('should delete angel permanently', function (done) {
            request(app)
                .delete('/api/angels/' + angelId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });

        it("deleted angel shouldn't exist anymore", function (done) {
            request(app)
                .get('/api/angels/' + angelId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

    });

});