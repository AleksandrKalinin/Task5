export class AddCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    console.log(currentValue);
    console.log(this.value);
    return currentValue + this.value;
  }

  undo(currentValue) {
    return currentValue - this.value;
  }
}