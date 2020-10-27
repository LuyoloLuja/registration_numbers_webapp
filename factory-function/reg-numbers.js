module.exports = function RegNumbers() {
    var registrationNumbers = [];

    async function regSelection(selectReg) {
        if (selectReg.startsWith("CA ") || selectReg.startsWith("CL ") || selectReg.startsWith("CJ ") || selectReg.startsWith("CAG ")) {
            await registrationNumbers.push(selectReg);
        }
    }

    function appendRegNums(registrations) {

        for (var i = 0; i < registrations.length; i++) {
            let currentReg = registrations[i];
            return currentReg;
        }
    }

    function filter(regPlates) {
        var regFilter = [];

        for (var i = 0; i < registrationNumbers.length; i++) {
            var currentNumberPlate = registrationNumbers[i]
            if (currentNumberPlate.startsWith(regPlates)) {
                regFilter.push(currentNumberPlate);
            }
        }
        return regFilter;
    }

    function errorMessage(regNumbers){
        registrationsEntered = [];

        if (regNumbers !== startsWith("CA ") || regNumbers !== startsWith("CL ") || regNumbers !== startsWith("CJ ") || regNumbers !== startsWith("CAG ")) {
            return "Please enter a valid registration number!";
        }
        if(regNumbers === "" || regNumbers === " "){
            return "Please enter a registration number!";
        }
        if (registrationsEntered.inculdes(regNumbers)) {
            return "Registration number already exists!";
        }
        if (regNumbers.length >= 10) {
            return "Invalid! Registration should be less than 10!";
        }
    }

    return {
        regSelection,
        appendRegNums,
        filter,
        errorMessage
    }
}