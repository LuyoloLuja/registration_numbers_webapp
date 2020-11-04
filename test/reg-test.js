let assert = require('assert');
let Registrations = require('../reg-numbers');

const pg = require('pg')
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/reg_numbers';
const pool = new Pool({
    connectionString
});

let registration = Registrations(pool);

describe('The registration numbers webapp', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from registration_numbers;");
        // await pool.query("delete from greet_count;");
    });

    describe('settingReg()', async function () {
        it('Should add a registration number', async function () {
            let actual = await registration.settingReg("CA 123");
            let expected = true;
            assert.strictEqual(actual, expected);
        })
    })

    describe('filter()', async function () {
        it('Should filter through registration numbers', async function () {

            await registration.settingReg("CA 123");
            await registration.settingReg("CL 123");
            await registration.settingReg("CJ 123");

            let actual = await registration.filter(1);
            console.log(actual);

            let expected = [{"registration":"CA 123", "town_entered":1}];
            
            assert.deepStrictEqual(actual, expected);
        })
    })




})