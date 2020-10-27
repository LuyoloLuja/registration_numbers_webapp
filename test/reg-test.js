let assert = require('assert');
let Registrations = require('../reg-test');
const pg = require('pg')
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_test_db';
const pool = new Pool({
    connectionString
});

let registration = Registrations(pool);