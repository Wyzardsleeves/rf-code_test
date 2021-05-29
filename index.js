const inquirer = require('inquirer')

class PrintStation{
  constructor(size, labelCount){
    this.size = size
    this.labelCount = labelCount
    this.maxCharacters = 1024
  }

  //Output method for entire app
  output = () => {
    console.log(`Size input is "${this.size}" and you want "${this.labelCount}"`);
  }
}

var questions = [
  {
    type: 'input',
    name: 'Label size',
    message: "What is the size?"
  },
  {
    type: 'input',
    name: 'Label count',
    message: "How many?"
  }
]

inquirer
  .prompt(questions)
  .then((answers) => {
    var ps = new PrintStation(answers["Label size"], answers["Label count"]);
    ps.output()
  })
  .catch((error) => console.log(error))
