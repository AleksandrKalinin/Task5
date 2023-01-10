const commands = require('../js/commands/index');
import { calculator } from './calculatorObject';

describe('Testing AddCommand functionality', () => {

  afterEach(() => {
    calculator.clear();
  });    

  test('Checking execute function', () => {
    expect(typeof new commands.AddCommand().execute).toBe('function');
  });

  test('Checking undo function', () => {
    expect(typeof new commands.AddCommand().undo).toBe('function');
  }); 

  test('Checking addition result', () => {
    calculator.execute(new commands.AddCommand(10));
    calculator.setValue();
    expect(calculator.value).toBe(10);
  });

  test('Checking addition result with negative number', () => {
    calculator.execute(new commands.AddCommand(-10));
    calculator.setValue();
    expect(calculator.value).toBe(-10);
  });

})