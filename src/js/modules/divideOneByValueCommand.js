export class DivideCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (currentValue !== 0) {
      return 1 / currentValue;
    }
    //return currentValue;
  }

  undo(currentValue) {
    return 1 / currentValue;;
  }
}