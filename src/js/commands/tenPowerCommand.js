export class TenPowerCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    let result = 1;
    for (let i = 0; i < currentValue; i++) {
      result *= 10;
    }
    return result;
  }

  undo(currentValue) {
    return currentValue.toString().length - 1;
  }
}