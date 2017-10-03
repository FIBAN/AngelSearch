"use strict";
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const testDB = require('../test_helpers/db');
const testAuth0 = require('../test_helpers/auth0');

describe("/api/documents Endpoints", function () {

    let auth0Token;

    // Initialize test database and get an auth0 token for test user
    before(function (done) {
        const dbSetup = testDB.createTestDB()
            .then(() => testDB.runSqlScript('./scripts/documents-test-data.sql'));

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

    describe('#GET /api/documents', function () {
        it('should get all documents', function (done) {
            request(app)
                .get('/api/documents')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
    });

    describe('#GET /api/documents/:documentId', function () {

        const documentId = 'xZ3I2jNKRTiQeLIMIhlkAA==';
        const nonExistentDocumentId = 'ThisIdIsNotReal';

        it('should return single document', function (done) {
            request(app)
                .get('/api/documents/' + documentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(documentId);
                    done();
                });
        });

        it('should return 404 if no document exists with given id', function(done) {
            request(app)
                .get('/api/documents/' + nonExistentDocumentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

    describe('#POST /api/documents', function () {
        let newDocumentId;

        const newDocument = {
            name: 'Brand New Document',
            type: 'file',
            download_url: 'http://example.com/new.txt'
        };

        it('should create new document', function (done) {
            request(app)
                .post('/api/documents')
                .send(newDocument)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal(newDocument.name);
                    expect(res.body.download_url).to.equal(newDocument.download_url);
                    newDocumentId = res.body.id;
                    done();
                });
        });

        it('new document should be queryable', function (done) {
            request(app)
                .get('/api/documents/' + newDocumentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(newDocumentId);
                    done();
                });
        });

        it('should return 400 if document type is unsupported', function (done) {
            const invalidDocument = {
                name: 'Invalid file',
                type: 'banana'
            };
            request(app)
                .post('/api/documents')
                .send(invalidDocument)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(400);
                    done();
                });
        });
    });

    describe('#PUT /api/documents/:documentId', function () {

        const documentId = 'xZ3I2jNKRTiQeLIMIhlkAA==';
        const nonExistentDocumentId = 'ThisIdIsNotReal';
        const newData = {name: "Document Name withuot typos"};

        it('should allow changing document name', function (done) {
            request(app)
                .put('/api/documents/' + documentId)
                .send(newData)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(documentId);
                    expect(res.body.name).to.equal(newData.name);
                    done();
                });
        });

        it('should return 404 if no document exists with given id', function(done) {
            request(app)
                .put('/api/documents/' + nonExistentDocumentId)
                .send(newData)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

    describe('#DELETE /api/documents/:documentId', function () {
        const documentId = 'xZ3I2jNKRTiQeLIMIhlkAA==';
        const nonExistentDocumentId = 'ThisIdIsNotReal';

        it('should delete document permanently', function (done) {
            request(app)
                .delete('/api/documents/' + documentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });

        it("deleted document shouldn't exist anymore", function (done) {
            request(app)
                .get('/api/documents/' + documentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('should return 404 if no document exists with given id', function(done) {
            request(app)
                .delete('/api/documents/' + nonExistentDocumentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

    });

});