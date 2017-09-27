"use strict";
const db = require('./db');
const util = require('../helpers/util');

module.exports.all = () => {
    return db.query('SELECT * FROM documents').then(res => res.rows);
};

module.exports.get = (documentId) => {
    return db.query('SELECT * FROM documents WHERE id = $1', [documentId]).then(res => res.rows[0]);
};

module.exports.create = (document) => {
    return db.query(
        'INSERT INTO documents (' +
        'id, ' +
        'name, ' +
        'type, ' +
        'download_url ' +
        ') VALUES ($1, $2, $3, $4) ' +
        'RETURNING *',
        [
            util.randomUUID(),
            document.name,
            document.type,
            document.download_url
        ]
    ).then(res => res.rows[0]);
};

module.exports.update = (document) => {
    let query = "UPDATE documents SET";
    let queryParams = [];

    if(document.name) {
        queryParams.push(document.name);
        query += " name = $" + queryParams.length;
    }
    if(document.download_url) {
        if(queryParams.length) query += ", ";
        queryParams.push(document.download_url);
        query += " download_url = $" + queryParams.length;
    }

    if(!queryParams.length) {
        return Promise.resolve(0);
    }
    else {
        query += ", updated_at = now()";
        queryParams.push(document.id);
        query += " WHERE id = $" + queryParams.length;
        query += " RETURNING *";
        return db.query(query, queryParams).then(res => res.rows[0]);
    }
};

module.exports.delete = (documentId) => {
    return db.query('DELETE FROM documents WHERE id = $1', [documentId]).then(res => res.rowCount);
};