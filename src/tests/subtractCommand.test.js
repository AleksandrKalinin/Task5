const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing SubtractCommand functionality', () => {

  afterEach(() => {
    calculator.clear();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.SubtractCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.SubtractCommand().undo).toBe('function');
  }); 

  test('Checking subtraction result', () => {
    calculator.execute(new commands.SubtractCommand(5));
    expect(calculator.value - calculator.currentValue).toBe(-5);
  });

  test('Checking subtraction result with negative number', () => {
    calculator.execute(new commands.SubtractCommand(-5));
    expect(calculator.value - calculator.currentValue).toBe(5);
  });

})
