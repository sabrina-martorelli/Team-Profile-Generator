
const questionsManager = [
    {
        type: 'input',
        name: 'managerName',
        message: "Team manager's name",
        validate: (managerName) => { 
            if (!managerName.length) return 'Please enter at least one character for the name (e.g., Sabrina M).' 
            return true;
        }
       

    },
    {
        type: 'input',
        name: 'managerId',
        message: "Team manager's id",
        validate: (managerID) => {
            if ((isNaN(managerID)) || (!(managerID.trim().length))) return 'Please enter a valid id number (e.g., 456).'
            return true;
        }
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "Team manager's email",
        validate: (managerEmail) => {
            emailOK = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(managerEmail)
            if (!emailOK) return ('Please enter a valid email address (e.g., sabrina@gmail.com).')
            return true    
        }


    },
    {
        type: 'input',
        name: 'managerOffice',
        message: "Team manager's office number",
        validate: (managerOffice) => {
            if ((isNaN(managerOffice)) || (!(managerOffice.trim().length))) return 'Please enter a valid office number (e.g., 404).'
            return true;
        }
    }
];

module.exports = questionsManager;




