import '../sass/main.sass';
import './modules/toggle.js';
import { Calculator } from './modules/calculator';
import { AddCommand } from './modules/addCommand';
import { SubtractCommand } from './modules/subtractCommand';
import { MultiplyCommand } from './modules/multiplyCommand';
import { DivideCommand } from './modules/divideCommand';
import { SetValueCommand } from './modules/setValueCommand';
import { ResetCommand } from './modules/resetCommand';
import { FactorialCommand } from './modules/factorialCommand';
import { ReverseSignCommand } from './modules/reverseSignCommand';
import { DivideOneByValueCommand } from './modules/divideOneByValueCommand';
import { TenPowerCommand } from './modules/tenPowerCommand';
import { PowerTwoCommand } from './modules/powerTwoCommand';
import { PowerThreeCommand } from './modules/powerThreeCommand';
import { PowerYCommand } from './modules/powerYCommand';
import { SquareRootCommand } from './modules/squareRootCommand';
import { CubicRootCommand } from './modules/cubicRootCommand';
import { VariousRootCommand } from './modules/variousRootCommand';
import { PercentageCommand } from './modules/percentageCommand';


const current = document.getElementById('displayCurrent');
const operations = document.getElementById('displayOperations');

//Proxy object for watching changes of calculator values
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
  }
  calculator.resetOperations();
  calculator.setPending(null);
}

//Numbers listener
const numbers = document.querySelectorAll('.button-number');

numbers.forEach((e) => {
  e.addEventListener('click', () => {
    if (calculator.pending !== null && calculator.value === calculator.currentInput) {
      calculator.resetInput();
    }
    const digit = Number(e.getAttribute('value'));
    calculator.executeInput(new SetValueCommand(digit));
  })
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
  }
})

const btnSubtract = document.getElementById('btnSubtract');
btnSubtract.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('-');
    calculator.updateOperations(calculator.currentInput + ' - ')
  }
})

const btnMultiply = document.getElementById('btnMultiply');
btnMultiply.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('*');
    calculator.updateOperations(calculator.currentInput + ' * ')
  }
})

const btnDivide = document.getElementById('btnDivide');
btnDivide.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('/');
    calculator.updateOperations(calculator.currentInput + ' / ')
  }
})

//Enter

const btnEnter = document.getElementById('btnEnter');
btnEnter.addEventListener('click', () => {
  /*
  switch(calculator.pending) {
  case '+': calculator.execute(new AddCommand(calculator.currentInput));
  case '-': calculator.execute(new SubtractCommand(calculator.currentInput));
  case '*': calculator.execute(new MultiplyCommand(calculator.currentInput));
  case '/': calculator.execute(new DivideCommand(calculator.currentInput));
  } */
  executeFunction();
  //calculator.execute(new AddCommand(calculator.currentInput));
  //calculator.updateOperations(calculator.currentInput);
  //console.log(calculator);
  //console.log(calculator.history[0])
})

//Factorial

const btnFactorial = document.getElementById('btnFactorial');
btnFactorial.addEventListener('click', () => {
  console.log(calculator.currentInput);
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
  calculator.executeInput(new PowerYCommand(calculator.currentInput));
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
/*

//M-buttons
const btnMemoryClear = document.getElementById('btnMemoryClear');
const btnMemoryRecall = document.getElementById('btnMemoryRecall');
const btnMemorySubtract = document.getElementById('btnMemorySubtract');
const btnMemoryAdd = document.getElementById('btnMemoryAdd');

//root and square operations

//not implemented yet
const btnLn = document.getElementById('btnLn');
const btnLog10 = document.getElementById('btnLog10');
const btnSin = document.getElementById('btnSin');
const btnCos = document.getElementById('btnCos');
const btnTan = document.getElementById('btnTan');
const btnLeftBrace = document.getElementById('btnLeftBrace');
const btnRightBrace = document.getElementById('btnRightBrace');
const btnDot = document.getElementById('btnDot');

*/

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