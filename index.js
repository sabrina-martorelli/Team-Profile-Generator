const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];




// TODO: Write Code to gather information about the development team members, and render the HTML file.


//separate functions in different files if needed. One per menu 


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
            if ((isNaN(engineerId)) || (!(engineerId.trim().length)) )  return 'Please enter a valid id number (e.g., 543).'
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
            if ((isNaN(internId)) || (!(internId.trim().length)) )  return 'Please enter a valid id number (e.g., 987).'
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

const questionsActions = [
    {
        type: 'list',
        name: 'nextAction',
        message: "What action do you want to perform next?",
        choices: ['Add Engineer', 'Add Intern', 'Finish and show profile Team'],
    }
];




// Function to create README file
function outputHTML(fileName, data) {

    //Check if folder exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdir(OUTPUT_DIR, (error) =>  {
            
            if(error){ return console.error(error.message); }
            console.log('Output directory created successfully');
          
    });
    }

    //Creates file using data
    fs.writeFile(fileName, data, (error) => {
        if (error) { return console.error(error.message); }
    });
}


function addIntern() {

    inquirer.prompt(questionsIntern)
        .then(data => {
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
            team.push(intern);
            showNextAction();
        });

};


function addEngineer() {

    inquirer.prompt(questionsEngineer)
        .then(data => {
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineersGithub);
            team.push(engineer);
            showNextAction();
        });

};


function showNextAction() {

    inquirer.prompt(questionsActions)
        .then(data => {

            if (data.nextAction === 'Add Engineer') { 
                addEngineer();
             }
            else {
                    if (data.nextAction === 'Add Intern') { 
                            addIntern(); 
                    }
                    else {

                    
                    const renderToHTML = render(team); 
                    outputHTML(outputPath, renderToHTML);
                    console.log ('Thank you for using this app. Please visit output/team.html to see the new Team Profile.');  
                       
                    }

            };

        });

}


function getTeam() {

    inquirer.prompt(questionsManager)
        .then(data => {
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
            team.push(manager);
            showNextAction();
        });
}


function init() {

    //Calls function to generate team from prompt ad then call function to render results on HTMl page
    getTeam()


}


init();