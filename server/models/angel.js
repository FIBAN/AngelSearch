const db = require('./db');
const util = require('../helpers/util');

module.exports.all = () => {
    return db.query('SELECT * FROM angels').then(res => res.rows);
};

module.exports.get = (angelId) => {
    return db.query('SELECT * FROM angels WHERE id = $1', [angelId]).then(res => res.rows[0]);
};

module.exports.getByAuthId = (authId) => {
    return db.query('SELECT a.* FROM auth0_users u JOIN angels a ON u.angel_id = a.id WHERE u.id = $1', [authId]).then(res => res.rows[0]);
};

module.exports.getByEmail = (email) => {
    return db.query('SELECT * FROM angels WHERE email = $1', [email]).then(res => res.rows[0]);
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
    let query = "UPDATE angels SET";
    let queryParams = [];
    if(angel.first_name) {
        queryParams.push(angel.first_name);
        query += " first_name = $" + queryParams.length;
    }
    if(angel.last_name) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.last_name);
        query += " last_name = $" + queryParams.length;
    }
    if(angel.email) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.email);
        query += " email = $" + queryParams.length;
    }
    if(angel.phone) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.phone);
        query += " phone = $" + queryParams.length;
    }
    if(angel.city) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.city);
        query += " city = $" + queryParams.length;
    }
    if(angel.country) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.country);
        query += " country = $" + queryParams.length;
    }
    if(angel.bio) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.bio);
        query += " bio = $" + queryParams.length;
    }
    if(angel.linkedin) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.linkedin);
        query += " linkedin = $" + queryParams.length;
    }
    if(angel.network) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.network);
        query += " network = $" + queryParams.length;
    }

    if(!queryParams.length) {
        return Promise.resolve(0);
    }
    else {
        queryParams.push(angel.id);
        query += " WHERE id = $" + queryParams.length;
        console.log("query:", query, queryParams);
        return db.query(query, queryParams).then(res => res.rowCount);
    }
};

module.exports.linkAuth0Id = (angelId, auth0Id) => {
    return db.query('INSERT INTO auth0_users (id, angel_id) VALUES ($1, $2)', [auth0Id, angelId]).then(res => res.rowCount);
};

module.exports.delete = (angelId) => {
    return db.query('DELETE FROM angels WHERE id = $1', [angelId]).then(res => res.rowCount);
};
