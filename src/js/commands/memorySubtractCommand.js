export class MemorySubtractCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue - this.value;
  }

  undo(currentValue) {
    return currentValue + this.value;
  }
}