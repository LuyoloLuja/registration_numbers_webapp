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

    async function filter(regPlates) {

        if (regPlates.startsWith('CA ')) {
            await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 1]);
            let table = await pool.query('SELECT * FROM registration_numbers JOIN available_towns ON registration_numbers.town_entered = available_towns.id');
            console.log(table)
        } else if (regPlates.startsWith('CL ')) {
            await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 2]);
        } else if (regPlates.startsWith('CJ ')) {
            await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 3]);
        }

    }

    return {
        settingReg,
        printRegistrations,
        resetBtn,
        filter
    }
}