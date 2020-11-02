module.exports = function RegNumbers(pool) {

    async function settingReg(enteredReg) {

        enteredReg = enteredReg.toUpperCase();

        let selectReg = await pool.query('SELECT registration FROM registration_numbers WHERE registration = $1', [enteredReg]);

        if (selectReg.rowCount === 0) {
            await pool.query('INSERT INTO registration_numbers (registration) VALUES ($1)', [enteredReg]);
        }
    }

    async function printRegistrations() {
        let storedRegistrations = await pool.query('SELECT registration FROM registration_numbers');
        return storedRegistrations.rows;
    }

    async function resetBtn() {
        await pool.query('DELETE FROM registration_numbers');
    }

    function filter(regPlates) {
        var regFilter = [];

        if (regFilter.startsWith(regPlates)) {
            // regFilter.push(currentNumberPlate);
            // await pool.query('INSERT INTO ')            
        }

        return regFilter;
    }

    return {
        settingReg,
        printRegistrations,
        resetBtn,
        filter
    }
}