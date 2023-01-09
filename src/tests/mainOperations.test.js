const commands = require('../js/commands/index');
import { Calculator } from '../js/calculator';

const calculatorObject = new Calculator(0);

const calculator = new Proxy(calculatorObject, {
  set: function (target, key, value) {
    target[key] = value;
    return true;
  }
});


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
    console.log(calculator);     
    expect(calculator.memoryValue).toBe(2);
  });

})

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
