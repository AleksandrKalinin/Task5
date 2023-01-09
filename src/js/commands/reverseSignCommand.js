export default class ReverseSignCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return 0 - currentValue;
  }

  undo(currentValue) {
    return 0 - currentValue;
  }
}