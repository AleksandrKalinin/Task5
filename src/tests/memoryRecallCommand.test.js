const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing MemoryRecallCommand functionality', () => {

  afterEach(() => {
    calculator.clearMemory();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.MemorySubtractCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.MemorySubtractCommand().undo).toBe('function');
  }); 

  test('Checking recall from memory', () => {
    calculator.executeMemory(new commands.MemoryAddCommand(2)); 
    calculator.recallMemory();     
    expect(calculator.currentValue).toBe(2);        
  });

})
