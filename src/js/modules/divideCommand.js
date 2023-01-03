export class DivideCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (this.value !== 0) {
      return this.value / currentValue;
    }
  }

  undo(currentValue) {
    return this.value + currentValue;
  }
}