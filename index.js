// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown');


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your project name?:',
        name: 'project'
    },
    {
        type: 'input',
        message: 'Write a short description of your project?:',
        name: 'description'
    },
    {
        type: 'list',
        message: 'What license does this project use?:',
        name: 'license',
        choices: ['MIT', 'Apache license 2.0', 'GNU General Public License', 'Unlicensed']
    },
    {
        type: 'input',
        message: 'What does the user need to install to run? (dependencies):',
        name: 'installation'
    },
    {
        type: 'input',
        message: 'What command should be run to test the app?:',
        name: 'tests'
    },
    {
        type: 'input',
        message: 'What does the user need to know about using the app?:',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'How to contribute to the project?:',
        name: 'contribute'
    },
    {
        type: 'input',
        message: 'What is your Github username?:',
        name: 'username'
    },
    {
        type: 'input',
        message: 'What is your email?:',
        name: 'email'
    }

];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
   fs.writeFile(fileName, data, function(err) {
       console.log(fileName);
       console.log(data);
       if(err) {
           return console.log(err);
       } else {
           console.log("success!");
       }
   })
}


// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(function(data) {
            writeToFile('README.md', generateMarkdown(data));
            console.log(data);
        })
}


// Function call to initialize app
init();
