const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const testDB = require('../test_helpers/db');
const testAuth0 = require('../test_helpers/auth0');

describe("/api/invitations Endpoints", function () {

    let auth0Token;

    // Initialize test database and get an auth0 token for test user
    before(function (done) {
        const dbSetup = testDB.createTestDB()
            .then(() => testDB.runSqlScript('./scripts/invitations-test-data.sql'));

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

    describe('#POST /api/invitations/:invitationId/accept', function () {

        const inviationId = 'dcnWr1xsTVOGKybVHvTZ5w==';

        it('should set invitation status to accepted', function (done) {
            request(app)
                .post('/api/invitations/' + inviationId + '/accept')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.equal('accepted');
                    done();
                });
        });

    });

    describe('#GET /api/invitations', function () {
        it('should list all invitations', function (done) {
            request(app)
                .get('/api/invitations')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
    });

    describe('#GET /api/invitations/:invitationId', function () {

        const inviationId = 'dcnWr1xsTVOGKybVHvTZ5w==';
        const nonExistentId = 'NotARealId';

        it('should return a single invitation', function (done) {
            request(app)
                .get('/api/invitations/' + inviationId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(inviationId);
                    done();
                });
        });

        it('should return 404 if no invitation exists with given id', function (done) {
            request(app)
                .get('/api/invitations/' + nonExistentId)
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

    describe('#GET /api/angels/:angelId/invitations', function () {
        const angelId = 'hQyM4YDXQ_qIC2kdFfzVEQ==';

        it('should list invitations for the angel', function (done) {
            request(app)
                .get('/api/angels/' + angelId + '/invitations')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });

    describe('#POST /api/angels/:angelId/invitations', function () {
        const angelId = 'WvaGqpLbRX+UXeLc8KDkNg==';
        let newInvitationId;

        //angel should have one pending invitation
        before(function (done) {
            request(app)
                .get('/api/angels/' + angelId + '/invitations')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].status).to.equal('pending');
                    done();
                });
        });

        it('should create a new invitation for the angel', function (done) {
            request(app)
                .post('/api/angels/' + angelId + '/invitations')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.angel_id).to.equal(angelId);
                    expect(res.body.status).to.equal('pending');
                    newInvitationId = res.body.id;
                    done();
                });
        });

        it('should cancel previous pending invitations', function (done) {
            request(app)
                .get('/api/angels/' + angelId + '/invitations')
                .set('Authorization', 'Bearer ' + auth0Token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(2);
                    expect(res.body.filter(i => i.status === 'pending').length).to.equal(1);
                    expect(res.body.filter(i => i.status === 'cancelled').length).to.equal(1);
                    done();
                });
        })
    });
});