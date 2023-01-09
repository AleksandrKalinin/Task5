export default class ModCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue % this.value;
  }

}