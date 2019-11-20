const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || require('../../db/database_auth.js');

const pool = new Pool({ connectionString });

const dbRequest = async (req) => {
    const { rows } = await pool.query(req);
    return rows;
};

module.exports = dbRequest;