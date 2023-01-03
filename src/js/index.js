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

const executeFunction = () => {
  switch(calculator.pending) {
  case '+': calculator.executeInput(new AddCommand(calculator.value));
    break;
  case '-': calculator.executeInput(new SubtractCommand(calculator.value));
    break;
  case '*': calculator.executeInput(new MultiplyCommand(calculator.value));
    break;
  case '/': calculator.executeInput(new DivideCommand(calculator.value));
    break;
  case 'yroot': calculator.executeInput(new VariousRootCommand(calculator.value));
    break;
  case '%': calculator.executeInput(new PercentageCommand(calculator.value));
    break;
  case '^': calculator.executeInput(new PowerYCommand(calculator.value));  
    break;    
  }
  calculator.resetOperations();
  calculator.setPending(null);
}

//Digits Numbers listener

const digits = document.querySelectorAll('.button-number');

function digitsFunction(e) {
  if (calculator.pending !== null && calculator.value === calculator.currentInput) {
    calculator.resetInput();
  }
  const digit = Number(e.getAttribute('value'));
  calculator.executeInput(new SetValueCommand(digit));  
}

digits.forEach((e) => {
  e.addEventListener('click', () => {
    digitsFunction(e)
  });
})

//Delete Command

const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () => {
  if (calculator.currentInput !== 0) {
    calculator.undoInput(new SetValueCommand(calculator.currentInput));
  }
})


//ClearCommand

const btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', () => {
  calculator.clear();
});

//AddCommand, SubtractCommand, MultiplyCommand, DivideCommand

const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('+');
    calculator.updateOperations(calculator.currentInput + ' + ')
  } else {
    executeFunction();
  }
})

const btnSubtract = document.getElementById('btnSubtract');
btnSubtract.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('-');
    calculator.updateOperations(calculator.currentInput + ' - ')
  } else {
    executeFunction();
  }
})

const btnMultiply = document.getElementById('btnMultiply');
btnMultiply.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('*');
    calculator.updateOperations(calculator.currentInput + ' * ')
  } else {
    executeFunction();
  }
})

const btnDivide = document.getElementById('btnDivide');
btnDivide.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('/');
    calculator.updateOperations(calculator.currentInput + ' / ')
  } else {
    executeFunction();
  }
})

//Enter

const btnEnter = document.getElementById('btnEnter');
btnEnter.addEventListener('click', () => {
  executeFunction();
})

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
  calculator.executeInput(new PowerTwoCommand(calculator.currentInput));
})

//PowerThreeCommand
const btnPower3 = document.getElementById('btnPower3');
btnPower3.addEventListener('click', () => {
  calculator.executeInput(new PowerThreeCommand(calculator.currentInput));
})

//PowerYCommand
const btnPowerY = document.getElementById('btnPowerY');
btnPowerY.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('^');
    calculator.updateOperations(calculator.currentInput + ' ^ ')
  } else {
    executeFunction();
  }  
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

//VariousRootCommand
const btnYRoot = document.getElementById('btnYRoot');
btnYRoot.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('yroot');
    calculator.updateOperations(calculator.currentInput + ' yroot ')
  } else {
    executeFunction();
  }  
  //calculator.executeInput(new VariousRootCommand(calculator.currentInput));
})

const btnPercentage = document.getElementById('btnPercentage');
btnPercentage.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('%');
    calculator.updateOperations(calculator.currentInput + ' % ')
  } else {
    executeFunction();
  }    
})


//M-buttons
const btnMemoryClear = document.getElementById('btnMemoryClear');
const btnMemoryRecall = document.getElementById('btnMemoryRecall');
const btnMemorySubtract = document.getElementById('btnMemorySubtract');
const btnMemoryAdd = document.getElementById('btnMemoryAdd');


/* not implemented yet
const btnLn = document.getElementById('btnLn');
const btnLog10 = document.getElementById('btnLog10');
const btnSin = document.getElementById('btnSin');
const btnCos = document.getElementById('btnCos');
const btnTan = document.getElementById('btnTan');
const btnLeftBrace = document.getElementById('btnLeftBrace');
const btnRightBrace = document.getElementById('btnRightBrace');
const btnDot = document.getElementById('btnDot');

*/

/*
document.addEventListener('keypress', function(e){
  alert(e.code);
  if (e.code === 'Digit0' || e.code === 'Numpad0') {
    alert(true);
  } else if (e.code === 'Digit0' || e.code === 'Numpad0') {
    alert(true);
  } else if (e.code === 'Digit1' || e.code === 'Numpad1') {
    alert(true);
  } else if (e.code === 'Digit2' || e.code === 'Numpad2') {
    alert(true);
  } else if (e.code === 'Digit3' || e.code === 'Numpad3') {
    alert(true);
  } else if (e.code === 'Digit4' || e.code === 'Numpad4') {
    alert(true);
  } else if (e.code === 'Digit5' || e.code === 'Numpad5') {
    alert(true);
  } else if (e.code === 'Digit6' || e.code === 'Numpad6') {
    alert(true);
  } else if (e.code === 'Digit7' || e.code === 'Numpad7') {
    alert(true);
  } else if (e.code === 'Digit8' || e.code === 'Numpad8') {
    alert(true);
  } else if (e.code === 'Digit9' || e.code === 'Numpad9') {
    alert(true);
  } else if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
    alert(true);
  } else if (e.code === 'Plus' || e.code === 'NumpadAdd') {
    alert(true);
  } else if (e.code === 'NumpadMultiply') {
    alert(true);
  } else if (e.code === 'NumpadDivide') {
    alert(true);    
  } else if (e.code === 'NumpadDecimal') {
    alert(true);
  }
})

*/