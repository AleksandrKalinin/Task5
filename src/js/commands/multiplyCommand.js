export default class MultiplyCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue * this.value;
  }

  undo(currentValue) {
    return this.value;
  }
}