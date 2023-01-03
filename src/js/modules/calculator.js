export class Calculator {
  constructor(val) {
    this.value = val;
    this.history = [];
    this.inputHistory = [];
    this.currentInput = 0;
    this.pending = null;
    this.operations = '';
  }

  execute(command) {
    this.value = command.execute(this.value);
    this.history.push(command);
    //console.log(this.history);
    switch(command.constructor.name) {
    case 'AddCommand': 
      //this.operations.push('+');
      break;
    case 'SubtractCommand': 
      //this.operations.push('-');
      break;
    case 'MultiplyCommand': 
      //this.operations.push('*');
      break;
    case 'DivideCommand': 
      //this.operations.push('/');
      break;
    }
  }

  undo() {
    const command = this.history.pop();
    this.value = command.undo(this.value);
  }

  executeInput(command) {
    this.currentInput = command.execute(this.currentInput);
    this.inputHistory.push(command);
  }

  undoInput() {
    const command = this.inputHistory.pop();
    this.currentInput = command.undo(this.currentInput)
  }  

  setValue() {
    this.value = this.currentInput;
  }

  clear() {
    this.history = [];
    this.value = 0;
  }

  resetInput() {
    this.currentInput = 0;
  }

  setPending(val) {
    this.pending = val;
  }

  updateOperations(val) {    
    this.operations += val;
  }

  consoleState() {
    //console.log('state')
  }

  /*
  module(val) {
    this.value = this.value / val;
  }  

  factorial(val) {
    this.value = this.value / val;
  }  

  switchSign(val) {
    this.value = this.value / val;
  }

  squareRoot(val) {
    this.value = this.value / val;
  }

  cubicRoot(val) {
    this.value = this.value / val;
  }   

  power2(val) {
    this.value = this.value / val;
  }

  power3(val) {
    this.value = this.value / val;
  }  

  powerY(val) {
    this.value = this.value / val;
  }  

  tenPowerX(val) {
    this.value = this.value / val;
  }         

  oneDivideOnX(val) {
    this.value = this.value / val;
  }  

  delete(val) {
    this.value = this.value / val;
  } 

  clear(val) {
    this.value = this.value / val;
  } 

  enter(val) {
    this.value = this.value / val;
  }   

  memoryAdd(val) {
    this.value = this.value / val;
  }  

  memorySubtract(val) {
    this.value = this.value / val;
  }

  memoryRecall(val) {
    this.value = this.value / val;
  } 

  memoryClear(val) {
    this.value = this.value / val;
  }  

  */            

  console() {
    alert(this.value);
  }
}

