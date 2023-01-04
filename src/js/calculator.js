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
  }

  undo() {
    const command = this.history.pop();
    this.value = command.undo(this.value);
  }

  executeInput(command) {
    this.currentInput = command.execute(this.currentInput);
    if (command.constructor.name === 'SetValueCommand') {
      this.inputHistory.push(command);
    } else {
      this.history.push(command);
    }
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
    this.currentInput = 0;
    this.operations = '';
    this.inputHistory = [];
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

  resetOperations() {
    this.operations = '';
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

