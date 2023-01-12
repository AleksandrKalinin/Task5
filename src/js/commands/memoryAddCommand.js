export default class MemoryAddCommand {
  constructor(memoryValue) {
    this.memoryValue = memoryValue;
  }

  execute(currentValue) {
    return this.memoryValue + currentValue;
  }

  undo(currentValue) {
    return this.memoryValue - currentValue;
  }
}