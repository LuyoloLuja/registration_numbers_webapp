let assert = require('assert');
let Registrations = require('../reg-numbers');

const pg = require('pg')
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/reg_test_db';
const pool = new Pool({
    connectionString
});

let registration = Registrations(pool);

describe('The registration numbers webapp', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from registration_numbers;");
    });

    describe('settingReg()', async function () {
        it('Should add a registration number from Cape Town', async function () {
            
            assert.equal(await registration.settingReg("CA 123"), true);
        })
        it('Should add a registration number from Stellenbosch', async function () {
            
            assert.equal(await registration.settingReg("CL 456"), true);
        })
        it('Should add a registration number from Paarl', async function () {
            
            assert.equal(await registration.settingReg("CJ 789"), true);
        })
        it('Should not make duplicates', async function(){
            await registration.settingReg("CA 123");
            await registration.settingReg("CA 123");
            await registration.settingReg("CA 123");

            assert.equal(1, await registration.duplicateMessage("CA 123"));
        })
    })

    describe('filter()', async function () {
        it('Should filter for Cape Town', async function () {

            await registration.settingReg("CA 123");
            await registration.settingReg("CL 123");
            await registration.settingReg("CJ 123");

            assert.deepEqual(await registration.filter(1), [{"registration":"CA 123"}]);
        })
        it('Should filter for Stellenbosch', async function () {

            await registration.settingReg("CA 123");
            await registration.settingReg("CL 123");
            await registration.settingReg("CJ 123");

            assert.deepEqual(await registration.filter(2), [{"registration":"CL 123"}]);
        })
        it('Should filter for Paarl', async function () {

            await registration.settingReg("CA 123");
            await registration.settingReg("CL 123");
            await registration.settingReg("CJ 123");

            assert.deepEqual(await registration.filter(3), [{"registration":"CJ 123"}]);
        })
    })

})