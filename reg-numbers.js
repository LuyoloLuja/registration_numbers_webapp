module.exports = function RegNumbers(pool) {

    async function settingReg(enteredReg) {

        enteredReg = enteredReg.toUpperCase();

        let code = await getTownId(enteredReg.split(" ")[0]);

        if (enteredReg.length <= 10) {
            let selectReg = await pool.query('SELECT registration FROM registration_numbers WHERE registration = $1', [enteredReg]);

            if (selectReg.rowCount === 0) {
                await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1,$2)', [enteredReg, code]);
                return true;
            }
            return false;
        }
    }

    async function duplicateMessage(enteredReg) {
        let checkDuplicates = await pool.query('SELECT registration FROM registration_numbers WHERE registration = $1', [enteredReg]);
        return checkDuplicates.rowCount;
    }

    async function getTownId(code) {
        let result = await pool.query("SELECT id FROM available_towns WHERE reg_code = $1", [code]);
        return result.rows[0]["id"];
    }

    async function printRegistrations() {
        let storedRegistrations = await pool.query('SELECT registration, town_entered FROM registration_numbers');
        return storedRegistrations.rows;
    }

    async function getTowns() {
        let towns = await pool.query('SELECT * FROM available_towns');
        return towns.rows;
    }

    async function filter(regCode) {
        let registrationNumbers = await printRegistrations();

        if (regCode === "all") {
            return registrationNumbers;
        }
        else {
            let selectedTown = await pool.query('SELECT registration FROM registration_numbers WHERE town_entered = $1', [regCode])
            return selectedTown.rows;
        }
    }

    async function resetBtn() {
        await pool.query('DELETE FROM registration_numbers');
    }

    return {
        settingReg,
        duplicateMessage,
        printRegistrations,
        getTowns,
        filter,
        resetBtn
    }
}