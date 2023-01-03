export class VariousRootCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return this.value ** (1 / currentValue)
  }

  undo(currentValue) {
    return this.value;
  }
}