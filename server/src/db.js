const { Pool } = require('pg');

//postgres configuration is read automatically from environmental variable
// DATABASE_URL=postgresql://dbuser:secretpassword@database.server.com:3211/mydb
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};