export default class PercentageCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue / 100 * this.value;
  }

  undo(currentValue) {
    return this.value;
  }
}