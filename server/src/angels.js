const uuidv4 = require('uuid/v4');
const db = require('./db');

const randomUUID = () => uuidv4(null, new Buffer(16), 0).toString('base64').replace(/\//g,'_');

module.exports = {

    list: (cb) => {
        db.query('SELECT * FROM angels')
            .then(res => cb(null, res.rows))
            .catch(err => cb(err));
    },

    forAngelId: (angelId, cb) => {
        db.query('SELECT * FROM angels WHERE id = $1', [angelId], cb);
    },

    forAuthId: (authId, cb) => {
        db.query('SELECT * FROM angels WHERE auth0_id = $1', [authId], cb);
    },

    create: (angel, cb) => {
        db.query(
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
            ],
            cb
        );
    },

    update: (angel, cb) => {
        db.run('UPDATE angels SET first_name = $1, last_name = $2, email = $3, phone = $4, city = $5, country = $6, bio = $7, auth0_id = $8 WHERE id = $9',
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
            ],
            cb
        );
    },

    delete: (angelId, cb) => {
        db.run('DELETE FROM angels WHERE id = $1', [angelId], cb);
    }
};