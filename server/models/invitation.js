"use strict";
const db = require('./db');
const util = require('../helpers/util');

const INVITE_STATUS = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    CANCELLED: 'cancelled'
};

module.exports.INVITE_STATUS = INVITE_STATUS;

module.exports.all = () => {
    return db.query('SELECT * FROM invitations').then(res => res.rows);
};

module.exports.allByAngelId = (angelId) => {
    return db.query('SELECT * FROM invitations WHERE angel_id = $1', [angelId]).then(res => res.rows);
};

module.exports.get = (inviteId) => {
    return db.query('SELECT * FROM invitations WHERE id = $1', [inviteId]).then(res => res.rows[0]);
};

module.exports.markAccepted = (inviteId) => {
    return db.query('UPDATE invitations SET status = $1 WHERE id = $2', [INVITE_STATUS.ACCEPTED, inviteId]).then(res => res.rowCount);
};

module.exports.markCancelled = (inviteId) => {
    return db.query('UPDATE invitations SET status = $1 WHERE id = $2', [INVITE_STATUS.CANCELLED, inviteId]).then(res => res.rowCount);
};

module.exports.create = (angelId) => {
    return module.exports.allByAngelId(angelId).then((invites) =>
        Promise.all(invites.map((invite) => {
            if(invite.status === INVITE_STATUS.PENDING) {
                return module.exports.markCancelled(invite.id);
            }
            else {
                return Promise.resolve();
            }
        }))
    ).then(() => db.query(
        'INSERT INTO invite (id, angel_id, status) VALUES ($1, $2, $3)',
        [
            util.randomUUID(),
            angelId,
            INVITE_STATUS.PENDING
        ]
    )).then(res => res.rowCount);
};

module.exports.delete = (inviteId) => {
    return db.query('DELETE FROM invitations WHERE id = $1', [inviteId]).then(res => res.rowCount);
};
