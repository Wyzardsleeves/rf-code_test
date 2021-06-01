const inquirer = require('inquirer')
const ora = require('ora');

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

  welcome(){
    console.clear()
    console.log(`================= Welcome to the printer =====================`)
    console.log(`Input the number of boxes that you have`)

    this.getBoxCount()
  }

  //using inquirer to get input
  getBoxCount(){
    var questions = [ //getting box sizes that will determine lable size
      {type: 'number', name: 'SmallBoxes', message: "How many small boxes?"},
      {type: 'number', name: 'MediumBoxes', message: "How many medium boxes?"},
      {type: 'number', name: 'LargeBoxes', message: "How many large boxes?"}
    ]

    inquirer
      .prompt(questions)
      .then((answers) => {
        this.printInit(answers["SmallBoxes"], answers["MediumBoxes"], answers["LargeBoxes"])
      })
      .catch((error) => console.log(error))
    }

    printInit(smallCount, mediumCount, largeCount){
      //psuedo printer UI
      console.clear()
      console.log(`=========================== Printing.... ================================`)
      console.log(`Printing labels for ${smallCount} small, ${mediumCount} medium, ${largeCount} large boxes!`)
      console.log(`-------------------------------------------------------------------------`)
      let parsePrintJob = this.getCharCount(smallCount, mediumCount, largeCount)
      console.log(`This will take ${parsePrintJob.time} seconds with ${parsePrintJob.charCount} characters and a total of ${parsePrintJob.pageCount} pages`)
      this.printAnimation(parsePrintJob.pageCount, 1)
    }

    //
    getCharCount(small, medium, large){
      let charCount = ((small * this.smallCharCount) + (medium * this.mediumCharCount) + (large * this.largeCharCount))
      let pageCount = Math.ceil(charCount / 1024)
      let time = pageCount * 10
      return {time, charCount, pageCount}
    }

    //using ora to imitate a printer working
    printAnimation(pages, currentPage){
      let throbber = ora(`Printing page ${currentPage} of ${pages} pages`).start();
      setTimeout(() => {  //delaying the next page to simulate a printer printing the current page
        throbber.stop();
        console.log('\x1b[36m%s\x1b[0m',`Page ${currentPage} of ${pages} complete!`)
        if(currentPage != pages){
          //using recursion for next page to be printed.
          this.printAnimation(pages, currentPage + 1)
        }
      }, 10000);
    }

}

var ps = new PrintStation();
ps.start()
