import '../sass/main.sass';
import './toggle.js';
import { Calculator } from './calculator';
import { 
  AddCommand, 
  SubtractCommand, 
  MultiplyCommand, 
  DivideCommand, 
  SetValueCommand, 
  ResetCommand, 
  FactorialCommand, 
  ReverseSignCommand, 
  DivideOneByValueCommand, 
  TenPowerCommand, 
  PowerTwoCommand, 
  PowerThreeCommand, 
  PowerYCommand, 
  SquareRootCommand, 
  CubicRootCommand, 
  VariousRootCommand, 
  PercentageCommand,
  MemoryClearCommand,
  MemoryRecallCommand,
  MemoryAddCommand,
  MemorySubtractCommand 
} from './commands';

//M-buttons(not implemented now)
const btnMemoryClear = document.getElementById('btnMemoryClear');
const btnMemoryRecall = document.getElementById('btnMemoryRecall');
const btnMemorySubtract = document.getElementById('btnMemorySubtract');
const btnMemoryAdd = document.getElementById('btnMemoryAdd');

const current = document.getElementById('displayCurrent');
const operations = document.getElementById('displayOperations');


//calculator object initialization
const calculatorObject = new Calculator(0);
const calculator = new Proxy(calculatorObject, {
  set: function (target, key, value) {
    target[key] = value;
    console.log(target);
    current.innerText = calculator.currentValue;
    operations.innerText = calculator.operations;     
    return true;
  }
});

//Checking dividing by zero
function checkForZero(target, commandName) {
  if (calculator.currentValue === 0) {
    if (target === commandName) {
      setTimeout(() => calculator.clear(), 1000)
    }
  }   
}

btnMemoryClear.addEventListener('click', () => {
  calculator.clearMemory();
})

btnMemoryRecall.addEventListener('click', () => {
  calculator.recallMemory();
})

btnMemoryAdd.addEventListener('click', () => {
  calculator.executeMemory(new MemoryAddCommand(calculator.currentValue));
})

btnMemorySubtract.addEventListener('click', () => {
  calculator.executeMemory(new MemorySubtractCommand(calculator.currentValue));
})

//Delete Command

const btnCE = document.getElementById('btnCE');
btnCE.addEventListener('click', () => {
  if (calculator.currentValue !== 0) {
    calculator.undoInput(new SetValueCommand(calculator.currentValue));
  }
})

//ClearCommand

const btnC = document.getElementById('btnC');
btnC.addEventListener('click', () => {
  calculator.clear();
});

//ReverseSign Command

const btnReverseSign = document.getElementById('btnReverseSign');
btnReverseSign.addEventListener('click', () => {
  calculator.execute(new ReverseSignCommand());
}) 

//Calculating result

const calculateResult = (nextCommand) => {
  checkForZero(calculator?.pending?.constructor.name, 'DivideCommand')
  if (calculator.pending !== null) {
    calculator.execute(calculator.pending);
    calculator.setValue();
    calculator.resetOperations('')
    calculator.updateOperations(calculator.currentValue);
    calculator.twoValues = 1;
    if (nextCommand !== null) {
      nextCommand.value = calculator.currentValue;
      calculator.setPending(nextCommand);
    } else {
      calculator.setPending(null);
    }
  }
}

const btnResult = document.getElementById('btnResult');
btnResult.addEventListener('click', () => {
  calculateResult(null);
})

const btnReverse = document.getElementById('btnReverse');
btnReverse.addEventListener('click', () => {
  if (calculator.currentValue !== 0) {
    calculator.undoInput(new SetValueCommand(calculator.currentValue));
  }
})

//Listener for 0 - 9 digits

const digits = document.querySelectorAll('.button-number');

function digitsFunction(e) {
  console.log('calculator', calculator);
  if (calculator.pending !== null && calculator.value === calculator.currentValue) {
    console.log('firing');
    calculator.resetInput();
  } 
  if (calculator.pending === null && 
      calculator.value === calculator.currentValue && 
      calculator.history.length !== 0) {
    calculator.resetInput();
    calculator.clear();
  }   
  const digit = Number(e.getAttribute('value'));
  calculator.execute(new SetValueCommand(digit));  
}

digits.forEach((e) => {
  e.addEventListener('click', () => {
    digitsFunction(e)
  });
})

//Function for processing operations with one argument

const oneArgs = document.querySelectorAll('.one__args');

function oneArgOperations(e) {
  const command = getOperator(e.getAttribute('value'));
  checkForZero(command.constructor.name, 'DivideOneByValueCommand');
  calculator.execute(command);
  calculator.resetOperations('');
  calculator.updateOperations(calculator.currentValue);
}

oneArgs.forEach((e) => {
  e.addEventListener('click', () => {
    oneArgOperations(e);
  })
})


//Function for processing operations with two arguments

const twoArgs = document.querySelectorAll('.two__args');

function getOperator(val) {
  let operation = null;
  switch(val) {
  case '+': operation = new AddCommand(calculator.currentValue);
    break;
  case '-': operation = new SubtractCommand(calculator.currentValue);
    break;
  case '*': operation = new MultiplyCommand(calculator.currentValue);
    break;
  case '/': operation = new DivideCommand(calculator.currentValue);
    break;
  case 'yroot': operation = new VariousRootCommand(calculator.value);
    break;
  case '^': operation = new PowerYCommand(calculator.value);
    break;
  case '%': operation = new PercentageCommand(calculator.value);
    break;
  case 'cRoot': operation = new CubicRootCommand(calculator.value);
    break;
  case 'sRoot': operation = new SquareRootCommand(calculator.value);
    break;
  case '!': operation = new FactorialCommand(calculator.value);
    break;
  case 'power2': operation = new PowerTwoCommand(calculator.value);
    break;
  case 'power3': operation = new PowerThreeCommand(calculator.value);
    break;
  case 'powerTen': operation = new TenPowerCommand(calculator.value);
    break;
  case 'divideX': operation = new DivideOneByValueCommand(calculator.value);
    break;                         
  }
  return operation;   
}

function twoArgsOperations(e) {
  const val = e.getAttribute('value');
  const command = getOperator(val);
  calculator.twoValues += 1;
  if (calculator.pending === null) {
    calculator.setValue();
    calculator.setPending(command);
    calculator.resetOperations('');
    calculator.updateOperations(`${calculator.currentValue} ${val} `); 
  } else {
    if (calculator.pending !== null && calculator.twoValues >= 2) {
      calculateResult(command);
    } else {
      calculator.setPending(command);
      const operations = calculator.operations;
      const trimmed = operations.slice(0, -5);
      calculator.resetOperations('');
      calculator.updateOperations(`${trimmed} ${val} `);
    }
  }

  /*
  if (calculator.pending !== null) { 
    if (flag) {
      const operations = calculator.operations;
      const trimmed = operations.slice(0, -5);
      calculator.resetOperations();
      calculator.updateOperations(trimmed);      
    }   
    if (calculator.history.length !== 0) {
      calculator.updateOperations(` ${val} `);     
    } else {
      calculator.updateOperations(calculator.currentInput); 
      calculator.updateOperations(` ${val} `);       
    } 
  }
  */


}

twoArgs.forEach((e) => {
  e.addEventListener('click', () => {
    twoArgsOperations(e);
  })
})

