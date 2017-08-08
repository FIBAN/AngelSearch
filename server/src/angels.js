const uuidv4 = require('uuid/v4');
const db = require('./db');

const randomUUID = () => uuidv4(null, new Buffer(16), 0).toString('base64').replace(/\//g,'_');

module.exports = {

    list: () => {
        return db.query('SELECT * FROM angels').then(res => res.rows);
    },

    forAngelId: (angelId) => {
        return db.query('SELECT * FROM angels WHERE id = $1', [angelId]).then(res => res.rows[0]);
    },

    forAuthId: (authId) => {
        return db.query('SELECT * FROM angels WHERE auth0_id = $1', [authId]).then(res => res.rows[0]);
    },

    create: (angel) => {
        return db.query(
            'INSERT INTO angels (id, first_name, last_name, email, phone, city, country, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                randomUUID(),
                angel.first_name,
                angel.last_name,
                angel.email,
                angel.phone,
                angel.city,
                angel.country,
                angel.bio
            ]
        ).then(res => res.rowCount);
    },

    update: (angel) => {
        return db.run('UPDATE angels SET first_name = $1, last_name = $2, email = $3, phone = $4, city = $5, country = $6, bio = $7, auth0_id = $8 WHERE id = $9',
            [
                angel.first_name,
                angel.last_name,
                angel.email,
                angel.phone,
                angel.city,
                angel.country,
                angel.bio,
                angel.auth0_id,
                angel.id
            ]
        ).then(res => res.rowCount);
    },

    delete: (angelId) => {
        return db.run('DELETE FROM angels WHERE id = $1', [angelId]).then(res => res.rowCount);
    }
};