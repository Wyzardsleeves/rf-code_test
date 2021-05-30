const inquirer = require('inquirer')

class PrintStation{
  constructor(){
    this.buffer = 0
    this.maxCharacters = 1024
    this.smallCharCount = 75
    this.mediumCharCount = 175
    this.largeCharCount = 375
  }

  //Start method for entire app
  start(){
    this.welcome()
  }

  clearDashboard = (ui) => {
    console.clear()
  }

  welcome(){
    this.clearDashboard()
    console.log(`================= Welcome to the printer =====================`)
    console.log(`Input the number of boxes that you have`)

    this.getBoxCount()
  }

  getBoxCount(){
    var questions = [
      {type: 'input', name: 'SmallBoxes', message: "How many small boxes?"},
      {type: 'input', name: 'MediumBoxes', message: "How many medium boxes?"},
      {type: 'input', name: 'LargeBoxes', message: "How many large boxes?"}
    ]

    inquirer
      .prompt(questions)
      .then((answers) => {
        this.printInit(answers["SmallBoxes"], answers["MediumBoxes"], answers["LargeBoxes"])
      })
      .catch((error) => console.log(error))
    }

    printInit(smallCount, mediumCount, largeCount){
      this.clearDashboard()
      console.log(`===================== Printing.... ===========================`)
      console.log(`Printing labels for ${smallCount} small, ${mediumCount} medium, ${largeCount} large boxes!`)
      console.log(`--------------------------------------------------------------`)
      let parsePrintJob = this.getCharCount(smallCount, mediumCount, largeCount)
      console.log(`This will take ${parsePrintJob.time} seconds with ${parsePrintJob.charCount} characters and a total of ${Math.ceil(parsePrintJob.pageCount)} pages`)

    }

    getCharCount(small, medium, large){
      let charCount = ((small * this.smallCharCount) + (medium * this.mediumCharCount) + (large * this.largeCharCount))
      let time = Math.floor(charCount / 150)
      let pageCount = charCount / 1024
      return {time, charCount, pageCount}
    }

}

var ps = new PrintStation();
ps.start()
