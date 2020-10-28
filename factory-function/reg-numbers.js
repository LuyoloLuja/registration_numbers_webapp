module.exports = function RegNumbers(pool) {

    async function appendRegNums(enteredReg) {
        if (enteredReg.startsWith("CA ") || enteredReg.startsWith("CL ") || enteredReg.startsWith("CJ ")) {
            let selectReg = await pool.query('SELECT * FROM registration_numbers WHERE registration = $1', [regSelection]);

            if(selectReg.rowCount === 0){
                await pool.query('INSERT INTO registration_numbers (registration) VALUES (enteredReg)');
            }            
        }
    }

    // function appendRegNums(registrations) {

    //     for (var i = 0; i < registrations.length; i++) {
    //         let currentReg = registrations[i];
    //         return currentReg;
    //     }
    // }

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
        appendRegNums
        // filter,
        // errorMessage
    }
}