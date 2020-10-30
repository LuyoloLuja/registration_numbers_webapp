module.exports = function RegNumbers(pool) {

    function enteredNumber(number) {
        if (number.startsWith("CA ") || number.startsWith("CL ") || number.startsWith("CJ ")) {
            return number;
        }
    }
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

    // function filter(regPlates) {
    //     var regFilter = [];

    //     for (var i = 0; i < registrationNumbers.length; i++) {
    //         var currentNumberPlate = registrationNumbers[i]
    //         if (currentNumberPlate.startsWith(regPlates)) {
    //             regFilter.push(currentNumberPlate);
    //         }
    //     }
    //     return regFilter;
    // }

    // function errorMessage(regNumbers){
    //     registrationsEntered = [];

    //     if (regNumbers !== startsWith("CA ") || regNumbers !== startsWith("CL ") || regNumbers !== startsWith("CJ ") || regNumbers !== startsWith("CAG ")) {
    //         return "Please enter a valid registration number!";
    //     }
    //     if(regNumbers === "" || regNumbers === " "){
    //         return "Please enter a registration number!";
    //     }
    //     if (registrationsEntered.inculdes(regNumbers)) {
    //         return "Registration number already exists!";
    //     }
    //     if (regNumbers.length >= 10) {
    //         return "Invalid! Registration should be less than 10!";
    //     }
    // }

    return {
        enteredNumber,
        settingReg,
        printRegistrations
        // filter,
        // errorMessage
    }
}