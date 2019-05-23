const pg = require('pg');

exports.pool = new pg.Pool({
    user: "postgres",
    host: 'localhost',
    database: 'Smac',
    password: 'vfvf1978',
});

