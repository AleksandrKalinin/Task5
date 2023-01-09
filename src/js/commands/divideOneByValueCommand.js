export default class DivideOneByValueCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (currentValue !== 0) {
      return 1 / currentValue;
    } else {
      return 'Деление на 0!'
    }
  }

  undo(currentValue) {
    return 1 / currentValue;;
  }
}