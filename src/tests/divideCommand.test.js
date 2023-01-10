const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing DivideCommand functionality', () => {

  afterEach(() => {
    calculator.clear();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.DivideCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.DivideCommand().undo).toBe('function');
  }); 

  test('Checking division result', () => {
    calculator.value = 6;
    calculator.currentValue = 2;
    calculator.execute(new commands.DivideCommand(calculator.value));
    calculator.setValue();
    expect(calculator.value).toBe(3);
  });

  test('Checking division result with negative number', () => {
    calculator.value = 6;
    calculator.currentValue = -2;
    calculator.execute(new commands.DivideCommand(calculator.value));
    calculator.setValue();
    expect(calculator.value).toBe(-3);
  });

  test('Checking division result with 0 as divisor', () => {
    calculator.value = 6;
    calculator.currentValue = 0;
    calculator.execute(new commands.DivideCommand(calculator.value));
    calculator.setValue();
    expect(calculator.currentValue).toBe('Деление на 0!');
  });    

})