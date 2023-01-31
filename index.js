//Require classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Require inquirer package
const inquirer = require("inquirer");

//Require inquirer input questions
const questionsManager = require("./lib/questionsManager");
const questionsEngineer = require("./lib/questionsEngineer");
const questionsIntern = require("./lib/questionsIntern");
const questionsActions = require("./lib/questionsActions");

//Require package to generate output  dir, path and file
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Require render function to generate HTML
const render = require("./src/page-template.js");

//Array to store information about team and generate HTML at the end
const team = [];


// Function to create output directory and output file
function outputHTML(fileName, data) {
    //Check if output folder exist before creating 
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdir(OUTPUT_DIR, (error) => {
            if (error) { return console.error(error.message); }
            console.log('Output directory created successfully');
        });
    }
    //Creates output file using generated data
    fs.writeFile(fileName, data, (error) => {
        if (error) { return console.error(error.message); }
    });
}


//Function to get input data of Interns
function addIntern() {
    //Use of questionsIntern prompt questions
    inquirer.prompt(questionsIntern)
        .then(data => {
            //Creates new intern object
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
            //Store new intern object on array
            team.push(intern);
            //Calls function to choose next action
            showNextAction();
        });

};

//Function to get input data of Engineers
function addEngineer() {
    //Use of questionsEngineer prompt questions
    inquirer.prompt(questionsEngineer)
        .then(data => {
            //Creates new engineer object
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineersGithub);
            //Store new engineer object on array
            team.push(engineer);
            //Calls function to choose next action
            showNextAction();
        });

};

//Function to show next action : add Engineer, addIntern or Finish data collection
function showNextAction() {
    //Use of questionsActions prompt questions
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
                    console.log('Thank you for using this app. Please visit output/team.html to see the new Team Profile.');

                }

            };

        });

}

//Function to get input data of Manager
function addManager() {
    //Use of questionsManager prompt questions
    inquirer.prompt(questionsManager)
        .then(data => {
            //Creates new manager object
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
            //Store new manager object on array
            team.push(manager);
            //Calls function to choose next action
            showNextAction();
        });
}


function init() {

    //Calls function to start
    addManager()

}


init();