export default class SetValueCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (currentValue === 0) {
      return this.value;
    } else {
      const newValue = Number(currentValue.toString() + this.value.toString());
      return newValue;
    }
  }

  undo(currentValue) {
    if (currentValue.toString().length === 1) {
      return 0;
    } else {
      const newValue = Number(currentValue.toString().slice(0,-1))
      return newValue;
    }
  }
}