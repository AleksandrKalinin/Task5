export default class SetValueCommand {
  constructor(value) {
    this.value = value;
  }

  /**
   * Concatenation of current input and stored value and conversion to Number type.
   * @param {number} currentValue - current input value.
   * @param {number} this.value - default value, which is returned in case if currentValue is 0.
   * @param {number} newValue - new concatenated value, which is returned by default.
   */   
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