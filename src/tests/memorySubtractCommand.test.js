const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing MemorySubtractCommand functionality', () => {

  afterEach(() => {
    calculator.clearMemory();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.MemorySubtractCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.MemorySubtractCommand().undo).toBe('function');
  }); 

  test('Checking subtraction from memory', () => {
    calculator.executeMemory(new commands.MemorySubtractCommand(2));     
    expect(calculator.memoryValue).toBe(-2);        
  });

})