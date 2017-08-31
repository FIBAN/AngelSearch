const db = require('./db');
const util = require('../helpers/util');

module.exports.all = () => {
    return db.query('SELECT * FROM angel_industries').then(res => res.rows);
};

module.exports.allByAngelId = (angelId) => {
    return db.query('SELECT * FROM angel_industries WHERE angel_id = $1', [angelId]).then(res => res.rows);
};

module.exports.create = (angelId, industry) => {
    return db.query(
        'INSERT INTO angel_industries (id, angel_id, industry) VALUES ($1, $2, $3)',
        [
            util.randomUUID(),
            angelId,
            industry
        ]
    ).then(res => res.rowCount);
};

module.exports.delete = (rowId) => {
    return db.query('DELETE FROM angel_industries WHERE id = $1', [rowId]).then(res => res.rowCount);
};
