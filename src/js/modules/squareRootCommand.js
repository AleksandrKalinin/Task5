export class SquareRootCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue
  }

  undo(currentValue) {
    return currentValue;
  }
}