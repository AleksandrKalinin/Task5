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

//M-buttons
const btnMemoryClear = document.getElementById('btnMemoryClear');
const btnMemoryRecall = document.getElementById('btnMemoryRecall');
const btnMemorySubtract = document.getElementById('btnMemorySubtract');
const btnMemoryAdd = document.getElementById('btnMemoryAdd');

const current = document.getElementById('displayCurrent');
const operations = document.getElementById('displayOperations');

const calculatorObject = new Calculator(0);

const calculator = new Proxy(calculatorObject, {
  set: function (target, key, value) {
    target[key] = value;
    console.log(target);
    current.innerText = calculator.currentInput;
    operations.innerText = calculator.operations;     
    return true;
  }
});

const calculateResult = () => {
  if (calculator.pending !== null) {
    calculator.updateOperations(calculator.currentInput);
    calculator.executeInput(calculator.pending);
    calculator.setPending(null);
    calculator.setValue(calculator.currentInput);
  }
}

const history = document.getElementById('history');
history.addEventListener('click', () => {
  console.log(calculator);
})

const btnEnter = document.getElementById('btnEnter');
btnEnter.addEventListener('click', () => {
  calculateResult();
})

//Digits Numbers listener

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

//Two arguments commands

const args = document.querySelectorAll('.two__args');

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
  }
  return operation;   
}

function operationsHandler(e) {
  const val = e.getAttribute('value');
  let command;
  if (calculator.pending === null) {
    calculator.setValue();
    command = getOperator(val)
    calculator.setPending(command);
  } else {
    calculateResult();
    command = getOperator(val);
    calculator.setPending(command);
  }
  if (calculator.pending !== null && calculator.history.length !== 0) {
    calculator.updateOperations(` ${val} `);     
  }
  if (calculator.pending !== null && calculator.history.length === 0) {
    calculator.updateOperations(calculator.currentInput); 
    calculator.updateOperations(` ${val} `);     
  } 
}

args.forEach((e) => {
  e.addEventListener('click', () => {
    operationsHandler(e);
  })
})

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


//Factorial

const btnFactorial = document.getElementById('btnFactorial');
btnFactorial.addEventListener('click', () => {
  calculator.executeInput(new FactorialCommand(calculator.currentInput));
})

//ReverseSign Command

const btnReverseSign = document.getElementById('btnReverseSign');
btnReverseSign.addEventListener('click', () => {
  calculator.executeInput(new ReverseSignCommand());
}) 


//DivideOneByValueCOmmand

const btnDivideOneByValue = document.getElementById('btnDivideOneByValue');
btnDivideOneByValue.addEventListener('click', () => {
  calculator.executeInput(new DivideOneByValueCommand(calculator.currentInput));
})

//TenPowerX delete
const btnTenPowerX = document.getElementById('btnTenPowerX');
btnTenPowerX.addEventListener('click', () => {
  calculator.executeInput(new TenPowerCommand(calculator.currentInput));
})

//PowerTwoCommand
const btnPower2 = document.getElementById('btnPower2');
btnPower2.addEventListener('click', () => {
  const command = new PowerTwoCommand(calculator.currentInput);
  calculator.executeInput(command);
  calculator.updateOperations(calculator.currentInput);
})

//PowerThreeCommand
const btnPower3 = document.getElementById('btnPower3');
btnPower3.addEventListener('click', () => {
  calculator.executeInput(new PowerThreeCommand(calculator.currentInput));
})

//SquareRootCommand
const btnSquareRoot = document.getElementById('btnSquareRoot');
btnSquareRoot.addEventListener('click', () => {
  calculator.executeInput(new SquareRootCommand(calculator.currentInput));
})

//CubicRootCommand
const btnCubicRoot = document.getElementById('btnCubicRoot');
btnCubicRoot.addEventListener('click', () => {
  calculator.executeInput(new CubicRootCommand(calculator.currentInput));
})
