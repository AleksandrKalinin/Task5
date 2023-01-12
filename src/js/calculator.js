export class Calculator {
  constructor(val) {
    this.value = val;
    this.history = [];
    this.inputHistory = [];
    this.currentValue = 0;
    this.pending = null;
    this.operations = '';
    this.memoryValue = 0;
    this.memoryHistory = [];
    this.twoValues = 0;
  }

  execute(command) {
    if (command.constructor.name === 'MemoryRecallCommand' || 
        command.constructor.name === 'MemoryAddCommand' || 
        command.constructor.name === 'MemorySubtractCommand') {
      command.constructor.name === 'MemoryRecallCommand' ? 
        this.currentValue = command.execute(this.currentValue) : 
        this.memoryValue = command.execute(this.memoryValue);
      this.memoryHistory.push(command);   
    } else {
      try {
        this.currentValue = command.execute(this.currentValue);
      } catch(err) {
        this.currentValue = err.message;
        this.resetOperations();
        this.updateOperations(err.message);
        console.log(this.currentValue);
      }
      if (command.constructor.name === 'SetValueCommand') {
        this.inputHistory.push(command);
      } else {
        this.history.push(command);
      }
    }
  }

  undo() {
    const command = this.history.pop();
    this.currentValue = command.undo(this.currentValue);
    this.value = command.undo(this.currentValue)
  }

  clearMemory() {
    this.memoryValue = 0;
  }

  undoInput() {
    const command = this.inputHistory.pop();
    this.currentValue = command.undo(this.currentValue)
  }  

  setValue() {
    this.value = this.currentValue;
  }

  clear() {
    this.history = [];
    this.value = 0;
    this.currentValue = 0;
    this.operations = '';
    this.inputHistory = [];
    this.pending = null;
    this.twoValues = 0;
  }

  reverse() {
    const current = this.history[this.history.length - 1];
    this.undo(current);
    this.setValue();
    this.resetOperations('');
    this.updateOperations(this.currentValue);    
  }

  executeOperation() {
    this.execute(this.pending);
    this.setValue();
    this.resetOperations('')
    this.updateOperations(this.currentValue);
    this.twoValues = 1;    
  }

  resetInput() {
    this.currentValue = 0;
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

