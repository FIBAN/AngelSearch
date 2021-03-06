"use strict";
const db = require('./db');
const util = require('../helpers/util');
const VError = require('verror').VError;

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
    if(!angel.investment_level && angel.investment_level !== 0) {
        angel.investment_level = null;
    }
    if(!angel.industries) {
        angel.industries = [];
    }
    if(angel.is_hidden !== true) {
        angel.is_hidden = false;
    }
    return db.query(
        'INSERT INTO angels (' +
        'id, ' +
        'first_name, ' +
        'last_name, ' +
        'email, ' +
        'phone, ' +
        'city, ' +
        'country, ' +
        'network, ' +
        'linkedin, ' +
        'investment_level, ' +
        'industries, ' +
        'bio, ' +
        'is_hidden' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ' +
        'RETURNING *',
        [
            util.randomUUID(),
            angel.first_name,
            angel.last_name,
            angel.email,
            angel.phone,
            angel.city,
            angel.country,
            angel.network,
            angel.linkedin,
            angel.investment_level,
            angel.industries,
            angel.bio,
            angel.is_hidden
        ]
    ).then(res => res.rows[0]);
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
    if(angel.investment_level) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.investment_level);
        query += " investment_level = $" + queryParams.length;
    }
    if(angel.industries) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.industries);
        query += " industries = $" + queryParams.length;
    }
    if(angel.is_hidden) {
        if(queryParams.length) query += ", ";
        queryParams.push(angel.is_hidden);
        query += " is_hidden = $" + queryParams.length;
    }

    if(!queryParams.length) {
        return db.query('SELECT * FROM angels WHERE id = $1', [angel.id]).then(res => res.rows[0]);
    }
    else {
        query += ", updated_at = now()";
        queryParams.push(angel.id);
        query += " WHERE id = $" + queryParams.length;
        query += " RETURNING *";
        return db.query(query, queryParams).then(res => res.rows[0]);
    }
};

module.exports.linkAuth0Id = (angelId, auth0Id) => {
    //Check if linking already exists
    return db.query('SELECT * from auth0_users WHERE id = $1', [auth0Id]).then(res => {
        //No prior linking exists
        if(!res.rows.length) {
            return db.query('INSERT INTO auth0_users (id, angel_id) VALUES ($1, $2) RETURNING *', [auth0Id, angelId]).then(res => res.rows[0]);
        }
        //Correct linking exists
        else if (res.rows[0].angel_id === angelId) {
            return Promise.resolve(res.rows[0]);
        }
        //Auth0Id is linked to another angel
        else {
            return Promise.reject(new VError({name: 'AUTH0_LINKING_EXISTS'}, 'Auth0 Id already linked to another Angel'));
        }
    });
};

module.exports.delete = (angelId) => {
    return db.query('DELETE FROM angels WHERE id = $1', [angelId]).then(res => res.rowCount);
};