export class VariousRootCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    console.log(this.value);
    console.log(currentValue);
    //return currentValue ** (1 / 2)
  }

  undo(currentValue) {
    return Math.round(currentValue * currentValue);
  }
}