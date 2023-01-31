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

const questionsManager = require ("./lib/questionsManager");
const questionsEngineer = require ("./lib/questionsEngineer");
const questionsIntern = require ("./lib/questionsIntern");
const questionsActions= require ("./lib/questionsActions");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


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