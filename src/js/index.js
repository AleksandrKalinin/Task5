import '../sass/main.sass';
import './toggle.js';
import { Calculator } from './calculator';
import * as commands from './commands';

const current = document.getElementById('displayCurrent');
const operations = document.getElementById('displayOperations');


//Calculator object initialization
const calculatorObject = new Calculator(0);

const calculator = new Proxy(calculatorObject, {
  set: function (target, key, value) {
    target[key] = value;
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


//Memory buttons functionality

const btnMemoryClear = document.getElementById('btnMemoryClear');
const btnMemoryRecall = document.getElementById('btnMemoryRecall');
const btnMemorySubtract = document.getElementById('btnMemorySubtract');
const btnMemoryAdd = document.getElementById('btnMemoryAdd');

btnMemoryClear.addEventListener('click', () => {
  calculator.clearMemory();
})

btnMemoryRecall.addEventListener('click', () => {
  calculator.recallMemory();
})

btnMemoryAdd.addEventListener('click', () => {
  calculator.executeMemory(new commands.MemoryAddCommand(calculator.currentValue));
})

btnMemorySubtract.addEventListener('click', () => {
  calculator.executeMemory(new commands.MemorySubtractCommand(calculator.currentValue));
})


//Delete Command

const btnCE = document.getElementById('btnCE');
btnCE.addEventListener('click', () => {
  if (calculator.currentValue !== 0) {
    calculator.undoInput(new commands.SetValueCommand(calculator.currentValue));
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
  if (calculator.currentValue !== 0) {
    calculator.execute(new commands.ReverseSignCommand());
  }
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


//Function for clearing current value by one digit

const btnBackspace = document.getElementById('btnBackspace');
btnBackspace.addEventListener('click', () => {
  if (calculator.currentValue !== 0) {
    calculator.undoInput(new commands.SetValueCommand(calculator.currentValue));
  }
})


const btnReverse = document.getElementById('btnReverse');
btnReverse.addEventListener('click', () => {
  if (calculator.history.length !== 0) {
    calculator.reverse();
  } else {
    calculator.clear();  
  }
})

//Listener for 0 - 9 digits

const digits = document.querySelectorAll('.button-number');

function digitsFunction(e) {
  if (calculator.pending !== null && calculator.value === calculator.currentValue) {
    calculator.resetInput();
  } 
  if (calculator.pending === null && 
      calculator.value === calculator.currentValue && 
      calculator.history.length !== 0) {
    calculator.resetInput();
    calculator.clear();
  }   
  const digit = Number(e.getAttribute('value'));
  calculator.execute(new commands.SetValueCommand(digit));  
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
  case '+': operation = new commands.AddCommand(calculator.currentValue);
    break;
  case '-': operation = new commands.SubtractCommand(calculator.currentValue);
    break;
  case '*': operation = new commands.MultiplyCommand(calculator.currentValue);
    break;
  case '/': operation = new commands.DivideCommand(calculator.currentValue);
    break;
  case 'mod': operation = new commands.ModCommand(calculator.currentValue);
    break;    
  case 'yroot': operation = new commands.VariousRootCommand(calculator.currentValue);
    break;
  case '^': operation = new commands.PowerYCommand(calculator.currentValue);
    break;
  case '%': operation = new commands.PercentageCommand(calculator.currentValue);
    break;
  case 'cRoot': operation = new commands.CubicRootCommand(calculator.currentValue);
    break;
  case 'sRoot': operation = new commands.SquareRootCommand(calculator.currentValue);
    break;
  case '!': operation = new commands.FactorialCommand(calculator.currentValue);
    break;
  case 'power2': operation = new commands.PowerTwoCommand(calculator.currentValue);
    break;
  case 'power3': operation = new commands.PowerThreeCommand(calculator.currentValue);
    break;
  case 'powerTen': operation = new commands.TenPowerCommand(calculator.currentValue);
    break;
  case 'divideX': operation = new commands.DivideOneByValueCommand(calculator.currentValue);
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
}

twoArgs.forEach((e) => {
  e.addEventListener('click', () => {
    twoArgsOperations(e);
  })
});
