export default class MemoryRecallCommand {
  constructor(memoryValue) {
    this.memoryValue = memoryValue;
  }

  execute(currentValue) {
    return this.memoryValue;
  }

}