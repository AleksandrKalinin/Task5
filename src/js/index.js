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
  PercentageCommand 
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
    current.innerText = calculator.currentInput;
    operations.innerText = calculator.operations;     
    return true;
  }
});

//Delete Command

const btnCE = document.getElementById('btnCE');
btnCE.addEventListener('click', () => {
  if (calculator.currentInput !== 0) {
    calculator.undoInput(new SetValueCommand(calculator.currentInput));
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
  calculator.executeInput(new ReverseSignCommand());
}) 

//Calculating result

const calculateResult = () => {
  if (calculator.pending !== null) {
    calculator.setValue();
    calculator.updateOperations(calculator.currentInput);
    calculator.executeInput(calculator.pending);
    calculator.setPending(null);
  }
}

const btnEnter = document.getElementById('btnEnter');
btnEnter.addEventListener('click', () => {
  calculateResult();
})

//Listener for 0 - 9 digits

const digits = document.querySelectorAll('.button-number');

function digitsFunction(e) {
  if (calculator.pending !== null && calculator.value === calculator.currentInput) {
    calculator.resetInput();
  } 
  if (calculator.pending === null && 
      calculator.value === calculator.currentInput && 
      calculator.history.length !== 0) {
    calculator.resetInput();
    calculator.clear();
  }   
  const digit = Number(e.getAttribute('value'));
  calculator.executeInput(new SetValueCommand(digit));  
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
  calculator.executeInput(command);
  calculator.resetOperations('');
  calculator.updateOperations(calculator.currentInput);
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
  case '+': operation = new AddCommand(calculator.value);
    break;
  case '-': operation = new SubtractCommand(calculator.value);
    break;
  case '*': operation = new MultiplyCommand(calculator.value);
    break;
  case '/': operation = new DivideCommand(calculator.value);
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
  let command;
  let flag = false;
  if (calculator.pending === null) {
    calculator.setValue();
    command = getOperator(val)    
    calculator.setPending(command);
  } else if (calculator.pending !== null || calculator.history.length === 0){
    command = getOperator(val);
    if (calculator.pending.constructor.name !== command.constructor.name) {
      flag = true;
      calculator.setPending(command);
    } else {
      calculateResult();    
      calculator.setPending(command);
    }    
  }
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
}

twoArgs.forEach((e) => {
  e.addEventListener('click', () => {
    twoArgsOperations(e);
  })
})

