export class PowerYCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return this.value ** currentValue;
  }

  undo(currentValue) {
    return this.value;
  }
}