const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing MultiplyCommand functionality', () => {

  afterEach(() => {
    calculator.clear();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.MultiplyCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.MultiplyCommand().undo).toBe('function');
  }); 

  test('Checking multiplication result', () => {
    calculator.execute(new commands.AddCommand(2));
    calculator.execute(new commands.MultiplyCommand(5));
    calculator.setValue();
    expect(calculator.value).toBe(10);
  });

  test('Checking multiplication result with negative number', () => {
    calculator.execute(new commands.AddCommand(2));
    calculator.execute(new commands.MultiplyCommand(-5));
    calculator.setValue();
    expect(calculator.value).toBe(-10);
  });

  test('Checking multiplication result with 0 as multiplicand', () => {
    calculator.execute(new commands.MultiplyCommand(5));
    calculator.setValue();
    expect(calculator.value).toBe(0);
  });

})