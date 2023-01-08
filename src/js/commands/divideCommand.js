export class DivideCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (currentValue !== 0) {
      return this.value / currentValue;
    } else {
      return 'Деление на 0!'
    }
  }

  undo(currentValue) {
    return this.value;
  }
}