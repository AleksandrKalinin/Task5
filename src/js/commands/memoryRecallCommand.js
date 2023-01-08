export class MemoryRecallCommand {
  constructor(memoryValue) {
    this.memoryValue = memoryValue;
  }

  execute(currentValue) {
    return currentValue + this.value;
  }

}