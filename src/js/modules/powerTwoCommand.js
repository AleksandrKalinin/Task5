export class PowerTwoCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue * currentValue;
  }

  undo(currentValue) {
    return Math.sqrt(currentValue);
  }
}