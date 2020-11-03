module.exports = function RegNumbers(pool) {

    async function settingReg(enteredReg) {

        enteredReg = enteredReg.toUpperCase();

        let selectReg = await pool.query('SELECT registration FROM registration_numbers WHERE registration = $1', [enteredReg]);

        if (selectReg.rowCount === 0) {
            await pool.query('INSERT INTO registration_numbers (registration) VALUES ($1)', [enteredReg]);
        }
        console.log(selectReg);
    }

    async function printRegistrations() {
        let storedRegistrations = await pool.query('SELECT registration FROM registration_numbers');
        return storedRegistrations.rows;
    }

    async function resetBtn() {
        await pool.query('DELETE FROM registration_numbers');
    }

    async function filter(regPlates) {

        if (regFilter.startsWith(regPlates)) {

            if (regPlates.startsWith('CA ')) {
                await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 1]);
            } else if (regPlates.startsWith('CL ')) {
                await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 2]);
            } else if (regPlates.startsWith('CJ ')) {
                await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 3]);
            }
        }

    }

    return {
        settingReg,
        printRegistrations,
        resetBtn,
        filter
    }
}