export class PowerYCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    console.log(this.value);
    console.log(currentValue);
    //return currentValue ** (1 / 3);
  }

  undo(currentValue) {
    return currentValue - this.value;
  }
}