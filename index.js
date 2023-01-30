const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team =[];

// TODO: Write Code to gather information about the development team members, and render the HTML file.


//separate functions in different files if needed. One per menu 


const questionsManager = [
    {
        type: 'input',
        name: 'managerName',
        message: "Team manager's Name",
    },
    {
        type: 'input',
        name: 'managerId',
        message: "Team manager's Id",
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "Team manager's Email",
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: "Team manager's Office Number",
    }
];

const questionsEngineer = [
    {
        type: 'input',
        name: 'engineerName',
        message: "Engineer's Name",
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "Engineer's Id",
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "Engineer's Email",
    },
    {
        type: 'input',
        name: 'engineersGithub',
        message: "Engineer's GitHub Username",
    }
];

const questionsIntern = [
    {
        type: 'input',
        name: 'internName',
        message: "Intern's Name",
    },
    {
        type: 'input',
        name: 'internId',
        message: "Intern's Id",
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "Intern's Email",
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Intern's Shool",
    }
];

const questionsActions = [
    {
        type: 'list',
        name: 'nextAction',
        message: "What action do you want to perform next?",
        choices: ['Add Engineer','Add Intern','Finish and show profile Team'],
    }
];




function addIntern() {

    inquirer.prompt (questionsIntern) 
    .then (data => {

        const intern = new Intern (data.internName, data.internId, data.internEmail, data.internSchool);
        team.push(intern);
        showNextAction ();


    });

};


function addEngineer() {

    inquirer.prompt (questionsEngineer) 
    .then (data => {

        
        const engineer = new Engineer (data.engineerName, data.engineerId, data.engineerEmail, data.engineersGithub);
        team.push(engineer);
        showNextAction ();


    });

};


function showNextAction () {

    inquirer.prompt (questionsActions) 
        .then (data => {

            //s9elect answer
            if (data.nextAction === 'Add Engineer'){
                   
                addEngineer();
               

            } 
            else {
               
                if(data.nextAction === 'Add Intern'){
                  
                     addIntern();
                }

                else {
                    //render

                }

            };

        });

}


function generateTeam (){

inquirer.prompt (questionsManager)
    .then(data => {

       
        const manager = new Manager (data.managerName, data.managerId, data.managerEmail, data.managerOffice);
        team.push(manager);
        showNextAction();

    });

}


function init(){

    //Calls function to generate team from prompt ad then call function to render results on HTMl page
    generateTeam()
    
    //.then(renderHTML);

}


init();