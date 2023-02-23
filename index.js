const inquirer = require('inquirer');
const fs = require('fs');

//Empty Array for Team Members
const teamMembers = [];

function generateHTML() {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Roster</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <div class="jumbotron">
                <h1 class="display-4">My Team</h1>
            </div>
            <div class="row">`;
  
    for (let i = 0; i < teamMembers.length; i++) {
      if (teamMembers[i].role === 'Manager') {
        html += `
          <div class="col-sm-6 col-md-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">${teamMembers[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${teamMembers[i].role}</h6>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${teamMembers[i].id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${teamMembers[i].email}">${teamMembers[i].email}</a></li>
                  <li class="list-group-item">Office Number: ${teamMembers[i].officeNumber}</li>
                </ul>
              </div>
            </div>
          </div>
        `;
      } else if (teamMembers[i].role === 'Engineer') {
        html += `
          <div class="col-sm-6 col-md-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">${teamMembers[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${teamMembers[i].role}</h6>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${teamMembers[i].id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${teamMembers[i].email}">${teamMembers[i].email}</a></li>
                  <li class="list-group-item">GitHub: <a href="https://github.com/${teamMembers[i].github}">${teamMembers[i].github}</a></li>
                </ul>
              </div>
            </div>
          </div>
        `;
      } else if (teamMembers[i].role === 'Intern') {
        html += `
          <div class="col-sm-6 col-md-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">${teamMembers[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${teamMembers[i].role}</h6>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${teamMembers[i].id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${teamMembers[i].email}">${teamMembers[i].email}</a></li>
                  <li class="list-group-item">School: ${teamMembers[i].school}</li>
                </ul>
               </div>
              </div>
             </div>
            `;
      };   
}}    
//Team Manager Promp
function promptManager() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the Managers Name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the Managers ID Number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the Managers Email Address?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the Managers Office Number?',
        },
    ])
    .then((answers) => {
        const manager = {
            name: answers.name,
            id: answers.id,
            email: answers.email,
            officeNumber: answers.officeNumber,
            role: 'Manager',
        };
        teamMembers.push(manager);
        console.log(teamMembers);
        promptTeamMember();
    });
}

function promptTeamMember() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Would you like to add an engineer or an intern, or finish building your team?',
            choices: ['Engineer', 'Intern', 'Finish'],
        },   
    ])
    .then((answers) => {
        if (answers.role === 'Engineer') {
            promptEngineer();
        } else if (answers.role === 'Intern') {
            promptIntern();
        } else {
            const html = generateHTML();
            console.log(html);
            fs.writeFile('./dist/index.html', html, (err) => 
            err ? console.log(err) : console.log('Successfully created index.html')
            );
        }
    });
}

function promptEngineer() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the engineers name?',
          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the engineers employee ID?',
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the engineers email address?',
          },
          {
            type: 'input',
            name: 'github',
            message: 'What is the engineers GitHub username?',
          },
        ])
        .then((answers) => {
            const engineer = {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                github: answers.github,
                role: 'Engineer',
            };
            teamMembers.push(engineer);
            promptTeamMember();
        });
}
function promptIntern() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the interns name?',
          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the interns employee ID?',
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the interns email address?',
          },
          {
            type: 'input',
            name: 'school',
            message: 'What school did the intern attend?',
          },
        ])
        .then((answers) => {
            const intern = {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                school: answers.school,
                role: 'Intern',
            };
            teamMembers.push(intern);
            promptTeamMember();
        });
}
promptManager();

// Define a function to generate the HTML file

   