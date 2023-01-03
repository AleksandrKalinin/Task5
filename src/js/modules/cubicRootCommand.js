export class CubicRootCommand {
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