
// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

  return `# ${data.project} 

https://github.com/${data.username}/${data.project}

# Description
${data.description}

# Table of Contents
* [License](#license) 
* [Installation](#installation)
* [Tests](#tests)
* [Usage](#usage)
* [Contribute](#contribute)
* [Questions](#questions)

# License 
This project is licensed with a ${data.license} license.

![License](https://img.shields.io/badge/License-${data.license}-blue.svg)

# Installation
The following necessary dependencies are required to run this app: ${data.installation} 

# Tests
The following command is needed to run test: ${data.tests}

# Usage
In order to use this app, ${data.usage}

# Contribute
${data.contribute}

#Screenshot:

# Questions
Contact me with any questions here:

*Github: ${data.username}

*email: ${data.email} 
`;
}

module.exports = generateMarkdown;
