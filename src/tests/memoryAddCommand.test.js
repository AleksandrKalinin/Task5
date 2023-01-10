const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing MemoryAddCommand functionality', () => {

  afterEach(() => {
    calculator.clearMemory();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.MemoryAddCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.MemoryAddCommand().undo).toBe('function');
  }); 

  test('Checking addition to memory', () => {
    calculator.executeMemory(new commands.MemoryAddCommand(2));
    expect(calculator.memoryValue).toBe(2);
  });

})
