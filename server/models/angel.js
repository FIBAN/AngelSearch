const db = require('./db');
const util = require('../helpers/util');

module.exports.all = () => {
    return db.query('SELECT * FROM angels').then(res => res.rows);
};

module.exports.get = (angelId) => {
    return db.query('SELECT * FROM angels WHERE id = $1', [angelId]).then(res => res.rows[0]);
};

module.exports.getByAuthId = (authId) => {
    return db.query('SELECT * FROM angels WHERE auth0_id = $1', [authId]).then(res => res.rows[0]);
};

module.exports.create = (angel) => {
    return db.query(
        'INSERT INTO angels (id, first_name, last_name, email, phone, city, country, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [
            util.randomUUID(),
            angel.first_name,
            angel.last_name,
            angel.email,
            angel.phone,
            angel.city,
            angel.country,
            angel.bio
        ]
    ).then(res => res.rowCount);
};

module.exports.update = (angel) => {
    return db.query('UPDATE angels SET first_name = $1, last_name = $2, email = $3, phone = $4, city = $5, country = $6, bio = $7 WHERE id = $8',
        [
            angel.first_name,
            angel.last_name,
            angel.email,
            angel.phone,
            angel.city,
            angel.country,
            angel.bio,
            angel.id
        ]
    ).then(res => res.rowCount);
};

module.exports.linkAuth0Id = (angelId, auth0Id) => {
    return db.query('UPDATE angels SET auth0_id = $1 WHERE id = $2', [auth0Id, angelId]).then(res => res.rowCount);
};

module.exports.delete = (angelId) => {
    return db.query('DELETE FROM angels WHERE id = $1', [angelId]).then(res => res.rowCount);
};
