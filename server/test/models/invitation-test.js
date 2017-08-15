const expect = require('chai').expect;
const sinon = require('sinon');

describe("Invitation", function () {
    const Invitation = require('../../models/invitation');
    const db = require('../../models/db');

    beforeEach(() => sinon.stub(db, 'query'));

    afterEach(() => db.query.restore());

    it("all() should return all invitations", function (done) {
        const expectation = [
            {
                id: 'dcnWr1xsTVOGKybVHvTZ5w==',
                angel_id: 'hQyM4YDXQ_qIC2kdFfzVEQ==',
                status: 'pending'
            },
            {
                id: 'Y13LEFxMTbiHwlgGgUlTrQ==',
                angel_id: 'WvaGqpLbRX+UXeLc8KDkNg==',
                status: 'accepted'
            }
        ];
        db.query.returns(Promise.resolve({rows: expectation}));
        Invitation.all().then((actual) => {
            expect(actual).to.equal(expectation);
            done();
        }).catch(err => done(err));
    });

    describe("create()", function () {

        beforeEach(() => {
            sinon.stub(Invitation, 'allByAngelId');
            sinon.stub(Invitation, 'markCancelled');
        });

        afterEach(() => {
            Invitation.allByAngelId.restore();
            Invitation.markCancelled.restore();
        });

        it("should create new invitation", function (done) {
            Invitation.allByAngelId.returns(Promise.resolve([]));
            db.query.returns(Promise.resolve({rowCount: 1}));
            Invitation.create('hQyM4YDXQ_qIC2kdFfzVEQ==').then((res) => {
                expect(res).equal(1);
                expect(db.query.calledOnce).equal(true);
                done();
            }).catch(err => done(err));
        });

        it("should cancel pending invitations of the same angel", function (done) {
            const invitations = [
                {
                    id: 'dcnWr1xsTVOGKybVHvTZ5w==',
                    angel_id: 'hQyM4YDXQ_qIC2kdFfzVEQ==',
                    status: 'pending'
                },
                {
                    id: 'Y13LEFxMTbiHwlgGgUlTrQ==',
                    angel_id: 'hQyM4YDXQ_qIC2kdFfzVEQ==',
                    status: 'accepted'
                }
            ];
            Invitation.allByAngelId.returns(Promise.resolve(invitations));
            Invitation.markCancelled.returns(Promise.resolve({rowCount: 1}));
            db.query.returns(Promise.resolve({rowCount: 1}));
            Invitation.create('hQyM4YDXQ_qIC2kdFfzVEQ==').then((res) => {
                expect(Invitation.markCancelled.withArgs('dcnWr1xsTVOGKybVHvTZ5w==').calledOnce).equal(true);
                done();
            }).catch(err => done(err));
        })
    });

});