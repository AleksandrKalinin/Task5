export class DivideCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (this.value !== 0) {
      return currentValue / this.value;
    }
    //return currentValue;
  }

  undo(currentValue) {
    return currentValue * this.value;
  }
}