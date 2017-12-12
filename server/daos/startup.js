"use strict";
const db = require('./db');
const util = require('../helpers/util');

module.exports.all = () => {
    return db.query('SELECT * FROM startups').then(res => res.rows);
};

module.exports.get = (startupId) => {
    return db.query('SELECT * FROM startups WHERE id = $1', [startupId]).then(res => res.rows[0]);
};

module.exports.create = (startup) => {
    return db.query(
        'INSERT INTO startups (' +
        'id, ' +
        'lead_angel_id, ' +
        'company_name, ' +
        'oneliner, ' +
        'industry, ' +
        'website, ' +
        'city, ' +
        'country, ' +
        'entrepreneur_name, ' +
        'entrepreneur_email, ' +
        'entrepreneur_phone, ' +
        'round_size_and_open_tickets, ' +
        'valuation, ' +
        'committed_percentage, ' +
        'pitch_deck_link, ' +
        'status' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) ' +
        'RETURNING *',
        [
            util.randomUUID(),
            startup.lead_angel_id,
            startup.company_name,
            startup.oneliner,
            startup.industry,
            startup.website,
            startup.city,
            startup.country,
            startup.entrepreneur_name,
            startup.entrepreneur_email,
            startup.entrepreneur_phone,
            startup.round_size_and_open_tickets,
            startup.valuation,
            startup.committed_percentage,
            startup.pitch_deck_link,
            startup.status
        ]
    ).then(res => res.rows[0]);
};

module.exports.update = (startup) => {
    let query = "UPDATE startups SET";
    let queryParams = [];

    if(startup.lead_angel_id) {
        queryParams.push(startup.lead_angel_id);
        query += " lead_angel_id = $" + queryParams.length;
    }
    if(startup.company_name) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.company_name);
        query += " company_name = $" + queryParams.length;
    }
    if(startup.oneliner) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.oneliner);
        query += " oneliner = $" + queryParams.length;
    }

    if(startup.industry) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.industry);
        query += " industry = $" + queryParams.length;
    }

    if(startup.website) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.website);
        query += " website = $" + queryParams.length;
    }

    if(startup.city) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.city);
        query += " city = $" + queryParams.length;
    }

    if(startup.country) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.country);
        query += " country = $" + queryParams.length;
    }

    if(startup.entrepreneur_name) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.entrepreneur_name);
        query += " entrepreneur_name = $" + queryParams.length;
    }

    if(startup.entrepreneur_email) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.entrepreneur_email);
        query += " entrepreneur_email = $" + queryParams.length;
    }

    if(startup.entrepreneur_phone) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.entrepreneur_phone);
        query += " entrepreneur_phone = $" + queryParams.length;
    }

    if(startup.round_size_and_open_tickets) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.round_size_and_open_tickets);
        query += " round_size_and_open_tickets = $" + queryParams.length;
    }

    if(startup.valuation) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.valuation);
        query += " valuation = $" + queryParams.length;
    }

    if(startup.committed_percentage) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.committed_percentage);
        query += " committed_percentage = $" + queryParams.length;
    }

    if(startup.pitch_deck_link) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.pitch_deck_link);
        query += " pitch_deck_link = $" + queryParams.length;
    }

    if(startup.status) {
        if(queryParams.length) query += ", ";
        queryParams.push(startup.status);
        query += " status = $" + queryParams.length;
    }

    if(!queryParams.length) {
        return Promise.resolve(0);
    }
    else {
        query += ", updated_at = now()";
        queryParams.push(startup.id);
        query += " WHERE id = $" + queryParams.length;
        query += " RETURNING *";
        return db.query(query, queryParams).then(res => res.rows[0]);
    }
};

module.exports.delete = (startupId) => {
    return db.query('DELETE FROM startups WHERE id = $1', [startupId]).then(res => res.rowCount);
};