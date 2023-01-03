export class CubicRootCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue ** (1 / 3)
  }

  undo(currentValue) {
    return Math.round(currentValue * currentValue * currentValue);
  }
}