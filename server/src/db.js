const { Pool } = require('pg');

//postgres configuration is read automatically from the environmental variables
//  PGHOST
//  PGUSER
//  PGDATABASE
//  PGPASSWORD
//  PGPORT
const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params)
};