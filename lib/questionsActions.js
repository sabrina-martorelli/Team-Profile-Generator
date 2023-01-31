//Define questions for next actions input
const questionsActions = [
    {
        type: 'list',
        name: 'nextAction',
        message: "What action do you want to perform next?",
        choices: ['Add Engineer', 'Add Intern', 'Finish and show profile Team'],
    }
];


module.exports = questionsActions;