export default class PowerThreeCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue * currentValue * currentValue;
  }

  undo(currentValue) {
    return Math.cbrt(currentValue);
  }
}