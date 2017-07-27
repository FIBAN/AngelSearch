const uuidv4 = require('uuid/v4');

const randomUUID = () => uuidv4(null, new Buffer(16), 0).toString('base64').replace(/\//g,'_');

module.exports = class Angels {

    constructor(db) {
        this.db = db;
    }

    list(cb) {
        this.db.all('SELECT * FROM angels', cb)
    }

    forAngelId(angelId, cb) {
        this.db.get('SELECT * FROM angels WHERE id = ?', angelId, cb);
    }

    forAuthId(authId, cb) {
        this.db.get('SELECT * FROM angels WHERE auth0_id = ?', authId, cb);
    }

    create(angel, cb) {
        this.db.run('INSERT INTO angels (id, first_name, last_name, email, phone, city, country, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            randomUUID(),
            angel.first_name,
            angel.last_name,
            angel.email,
            angel.phone,
            angel.city,
            angel.country,
            angel.bio,
            cb
        );
    }

    update(angel, cb) {
        this.db.run('UPDATE angels SET first_name = ?, last_name = ?, email = ?, phone = ?, city = ?, country = ?, bio = ?, auth0_id = ? WHERE id = ?',
            angel.first_name,
            angel.last_name,
            angel.email,
            angel.phone,
            angel.city,
            angel.country,
            angel.bio,
            angel.auth0_id,
            angel.id,
            cb
        );
    }

    delete(angelId, cb) {
        this.db.run('DELETE FROM angels WHERE id = ?', angelId, cb);
    }
}