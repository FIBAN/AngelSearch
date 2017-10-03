"use strict";
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const testDB = require('../test_helpers/db');
const testAuth0 = require('../test_helpers/auth0');

describe("/api/startups Endpoints", function () {

    let auth0Token;

    // Initialize test database and get an auth0 token for test user
    before(function (done) {
        const dbSetup = testDB.createTestDB()
            .then(() => testDB.runSqlScript('./scripts/startups-test-data.sql'));

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

    describe('#GET /api/startups', function () {
        it('should get all angels', function (done) {
            request(app)
                .get('/api/startups')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });

    describe('#GET /api/startups/:startupId', function () {

        const startupId = 'twBXSOINRJakVoSgINyGKw==';
        const nonExistentStartupId = 'ThisIdIsNotReal';

        it('should return single startup', function (done) {
            request(app)
                .get('/api/startups/' + startupId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(startupId);
                    done();
                });
        });

        it('should return 404 if no startup exists with given id', function(done) {
            request(app)
                .get('/api/startups/' + nonExistentStartupId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

    describe('#POST /api/startups', function () {
        let newStartupId;
        const nonExistentStartupId = 'ThisIdIsNotReal';

        const newStartup = {
            lead_angel_id: 'hQyM4YDXQ_qIC2kdFfzVEQ==',
            company_name: 'Company Corp',
            oneliner: 'Business 4Ever',
            industry: 'Money',
            website: 'http://example.com',
            city: 'Helsinki',
            country: 'Finland',
            entrepreneur_name: 'John Doe',
            entrepreneur_email: 'john@example.com',
            entrepreneur_phone: '123456789',
            round_size_and_open_tickets: '',
            valuation: '1 billion dollars',
            committed_percentage: '50',
            pitch_deck_link: 'http://example.com/pitchdeck'
        };

        it('should create new startup', function (done) {
            request(app)
                .post('/api/startups')
                .send(newStartup)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.company_name).to.equal(newStartup.company_name);
                    expect(res.body.lead_angel_id).to.equal(newStartup.lead_angel_id);
                    expect(res.body.entrepreneur_email).to.equal(newStartup.entrepreneur_email);
                    newStartupId = res.body.id;
                    done();
                });
        });

        it('new startup should be queryable', function (done) {
            request(app)
                .get('/api/startups/' + newStartupId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(newStartupId);
                    done();
                });
        });

        it('should return 400 if no angel exists with given lead angel id', function(done) {
            const startupWithInvalidAngelId = Object.assign({}, newStartup);
            startupWithInvalidAngelId.lead_angel_id = 'NotRealAngelId';
            request(app)
                .post('/api/startups')
                .send(startupWithInvalidAngelId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(400);
                    done();
                });
        });
    });

    describe('#PUT /api/startups/:startupId', function () {

        const startupId = 'twBXSOINRJakVoSgINyGKw==';
        const nonExistentStartupId = 'ThisIdIsNotReal';
        const newData = {entrepreneur_name: "Donald Trump", entrepreneur_email: "trump@example.com"};

        it('should allow changing entrepreneur info', function (done) {
            request(app)
                .put('/api/startups/' + startupId)
                .send(newData)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(startupId);
                    expect(res.body.entrepreneur_name).to.equal(newData.entrepreneur_name);
                    expect(res.body.entrepreneur_email).to.equal(newData.entrepreneur_email);
                    done();
                });
        });

        it('should return 404 if no startup exists with given id', function(done) {
            request(app)
                .put('/api/startups/' + nonExistentStartupId)
                .send(newData)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('should return 400 if no angel exists with given lead angel id', function(done) {
            const leadAngelUpdate = {lead_angel_id: 'ThisIsNotARealAngelId'};
            request(app)
                .put('/api/startups/' + startupId)
                .send(leadAngelUpdate)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(400);
                    done();
                });
        });
    });

    describe('#DELETE /api/startups/:startupId', function () {
        const startupId = 'twBXSOINRJakVoSgINyGKw==';
        const nonExistentStartupId = 'ThisIdIsNotReal';

        it('should delete startup permanently', function (done) {
            request(app)
                .delete('/api/startups/' + startupId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });

        it("deleted startup shouldn't exist anymore", function (done) {
            request(app)
                .get('/api/startups/' + startupId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('should return 404 if no startup exists with given id', function(done) {
            request(app)
                .delete('/api/startups/' + nonExistentStartupId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

    });

});