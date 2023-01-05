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
    this.currentInput = command.execute(this.currentInput);
    if (command.constructor.name === 'SetValueCommand') {
      this.inputHistory.push(command);
    } else {
      this.history.push(command);
    }
  }

  undo() {
    const command = this.history.pop();
    this.value = command.undo(this.value);
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

}

