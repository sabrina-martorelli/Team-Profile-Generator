//Define questions for add intern input
//Validates : enter at least one character, numbers and valid email format
const questionsIntern = [
    {
        type: 'input',
        name: 'internName',
        message: "Intern's name",
        validate: (internName) => {
            if (!internName.length) return 'Please enter at least one character for the name (e.g., Madison P).'
            return true;
        }

    },
    {
        type: 'input',
        name: 'internId',
        message: "Intern's id",
        validate: (internId) => {
            if ((isNaN(internId)) || (!(internId.trim().length))) return 'Please enter a valid id number (e.g., 987).'
            return true;
        }
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "Intern's email",
        validate: (internEmail) => {
            emailOK = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(internEmail)
            if (!emailOK) return ('Please enter a valid email address (e.g., madisonp@gmail.com).')
            return true
        }
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Intern's shool",
        validate: (internSchool) => {
            if (!internSchool.length) return 'Please enter at least one character for the School name (e.g., Garden Grove).'
            return true;
        }
    }
];


module.exports = questionsIntern;