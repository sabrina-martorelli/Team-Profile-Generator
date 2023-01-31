//Define questions for add engineer input
//Validates : enter at least one character, numbers and valid email format
const questionsEngineer = [
    {
        type: 'input',
        name: 'engineerName',
        message: "Engineer's name",
        validate: (engineerName) => {
            if (!engineerName.length) return 'Please enter at least one character for the name (e.g., Jose P).'
            return true;
        }
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "Engineer's id",
        validate: (engineerId) => {
            if ((isNaN(engineerId)) || (!(engineerId.trim().length))) return 'Please enter a valid id number (e.g., 543).'
            return true;
        }
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "Engineer's email",
        validate: (engineerEmail) => {
            emailOK = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(engineerEmail)
            if (!emailOK) return ('Please enter a valid email address (e.g., josep@gmail.com).')
            return true
        }
    },
    {
        type: 'input',
        name: 'engineersGithub',
        message: "Engineer's github username",
        validate: (engineersGithub) => {
            if (!engineersGithub.length) return 'Please enter at least one character for the github username (e.g., jose-p67).'
            return true;
        }
    }
];

module.exports = questionsEngineer;

