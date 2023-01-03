export class SquareRootCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue ** (1 / 2)
  }

  undo(currentValue) {
    return Math.round(currentValue * currentValue);
  }
}