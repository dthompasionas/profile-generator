const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const util = require('util');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

var teamArray = [];
const managerQuestion = [
    {
        type: "input",
        name: "name",
        message: "Enter the manager's name:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter the manager's email:",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What's the manager's office number:"
    },
    {
        type: "input",
        name: "id",
        message: "What's the managers ID number:"
    },
    //if the choice is yes, run employee question.
    {
        type: "list",
        name: "hasEmployee",
        message: "Are there employees under this manager?(y/n)",
        choices: ["yes", "no"]
    }]

const employeeQuestion = [
    {
        type: "input",
        name: "name",
        message: "Enter the employee's name:",
    },

    {
        type: "input",
        name: "email",
        message: "Enter the employee's email:",
    },

    {
        type: "input",
        name: "id",
        message: "What's the employees ID number:"
    },

    {
        type: "list",
        name: "employeeTitle",
        message: "What's the employee's title",
        choices: ["Engineer", "Intern"]

    },

     
    //when title is engineer and true, ask this
    {
        when: input => {
            return input.employeeTitle === "Engineer"
        },
        type: "input",
        name: "github",
        message: "Enter their github username:",
    },


    //when title is intern and true, ask this.
    {
        when: input => {
            return input.employeeTitle === "Intern"
        },
        type: "input",
        name: "school",
        message: "What's school are they enrolled in ?",
    },


    //when choice is yes, rerun employee question
    {
        type: "list",
        name: "addTeam",
        message: "add another employee?",
        choices: ["yes", "no"]
    }

]

function renderManager(){
    inquirer.prompt(managerQuestion).then(data => {
        let manager = new Manager(data.name, data.id, data.email, data.officeNumber, teamArray.length + 1);
        teamArray.push(manager);

        if(data.hasEmployee === "yes"){
            renderEmployee();
        } else {
            return false;
        }

    })
}

renderManager();


function renderEmployee(){
    inquirer.prompt(employeeQuestion).then(data => {
        if(data.employeeTitle === "Engineer"){
            let engineer = new Engineer(data.name, data.id, data.email, data.github, teamArray.length + 1);
            teamArray.push(engineer);

        } else {
            let intern = new Intern(data.name, data.id, data.email, data.school, teamArray.length + 1);
            teamArray.push(intern);
        }

        //run employeeQuestion again if you answer yes in add more employee
        if(data.addTeam === "yes"){
            addEmployee();
        }else{
            console.log(`Success! Team profiles created.`);
            buildTeam();
        }

        
    
    })
}


//employee question rerun
function addEmployee(){
    renderEmployee()
}

//builds the team
function buildTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
        
    }
    fs.writeFileSync(outputPath,render(teamArray), "utf-8");
}