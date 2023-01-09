export default class DivideCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (currentValue !== 0) {
      console.log('this.value', this.value);
      console.log('currentValue', currentValue);
      return this.value / currentValue;
    } else {
      return 'Деление на 0!'
    }
  }

  undo(currentValue) {
    return this.value;
  }
}