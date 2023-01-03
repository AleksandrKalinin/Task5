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
    let result = currentValue;
    for (let i = 0; i < currentValue.toString().length - 1; i++) {
      result /= 10;
    }
    return result;
  }
}