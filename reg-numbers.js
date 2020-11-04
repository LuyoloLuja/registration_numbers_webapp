module.exports = function RegNumbers(pool) {

    async function settingReg(enteredReg) {

        enteredReg = enteredReg.toUpperCase();

        let code = await getTownId(enteredReg.split(" ")[0]);

        let selectReg = await pool.query('SELECT registration FROM registration_numbers WHERE registration = $1', [enteredReg]);

        if (selectReg.rowCount === 0) {
            await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1,$2)', [enteredReg, code]);
            return true;
        }
        return false
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

    async function resetBtn() {
        await pool.query('DELETE FROM registration_numbers');
    }

    async function filter(regCode) {
        let registrationNumbers = await printRegistrations();

        if (regCode === "") {
            return registrationNumbers;
        }

        let regList = [];

        for (let i = 0; i < registrationNumbers.length; i++) {
            if (registrationNumbers[i]["town_entered"] === regCode) {
                regList.push(registrationNumbers[i])
            }
        }
        return regList;


        // if (regPlates.startsWith('CA ')) {
        //     await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 1]);
        //     let table = await pool.query('SELECT * FROM registration_numbers JOIN available_towns ON registration_numbers.town_entered = available_towns.id');
        //     console.log(table)
        // } else if (regPlates.startsWith('CL ')) {
        //     await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 2]);
        // } else if (regPlates.startsWith('CJ ')) {
        //     await pool.query('INSERT INTO registration_numbers (registration, town_entered) VALUES ($1, $2)', [regPlates, 3]);
        // }

    }

    return {
        settingReg,
        printRegistrations,
        getTowns,
        resetBtn,
        filter
    }
}