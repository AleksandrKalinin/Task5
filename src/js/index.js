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

//console.log(calculator);

//calculator.execute(new AddCommand(10));
//calculator.execute(new AddCommand(4));
//calculator.execute(new MultiplyCommand(22));
//console.log(calculator);
//calculator.execute(new DivideCommand(13));
//calculator.undo(new DivideCommand());
//console.log(calculator.value);

/*
const btn0 = document.getElementById('btn0');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btn7 = document.getElementById('btn7');
const btn8 = document.getElementById('btn8');
const btn9 = document.getElementById('btn9');
*/
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

const btnDelete = document.getElementById('btnDelete');

btnDelete.addEventListener('click', () => {
  if (calculator.currentInput !== 0) {
    calculator.undoInput(new SetValueCommand(calculator.currentInput));
  }
})

const btnClear = document.getElementById('btnClear');

btnClear.addEventListener('click', () => {
  calculator.clear();
});

const btnAdd = document.getElementById('btnAdd');
const btnSubtract = document.getElementById('btnSubtract');
const btnMultiply = document.getElementById('btnMultiply');
const btnDivide = document.getElementById('btnDivide');

btnAdd.addEventListener('click', () => {
  if (calculator.pending === null ) {
    calculator.setValue();
    calculator.setPending('+');
    calculator.updateOperations(calculator.currentInput + ' + ')
  }
})

const btnEnter = document.getElementById('btnEnter');
btnEnter.addEventListener('click', () => {
  calculator.execute(new AddCommand(calculator.currentInput));
  calculator.updateOperations(calculator.currentInput);
})

const btnFactorial = document.getElementById('btnFactorial');
btnFactorial.addEventListener('click', () => {
  console.log(calculator.currentInput);
  calculator.executeInput(new FactorialCommand(calculator.currentInput));
})

//calculator.executeInput(new FactorialCommand(5));
//calculator.undoInput(new FactorialCommand());


function router() {
  switch(calculator.pending) {
  case '+': calculator.execute(new AddCommand(calculator.currentInput));
  case '-': calculator.execute(new SubtractCommand(calculator.currentInput));
  case '*': calculator.execute(new MultiplyCommand(calculator.currentInput));
  case '/': calculator.execute(new DivideCommand(calculator.currentInput));
  }
}

/*

//main operations
const btnAdd = document.getElementById('btnAdd');
const btnSubtract = document.getElementById('btnSubtract');
const btnMultiply = document.getElementById('btnMultiply');
const btnDivide = document.getElementById('btnDivide');
const btnMod = document.getElementById('btnMod');
const btnFactorial = document.getElementById('btnFactorial');
const btnSwitchSign = document.getElementById('btnSwitchSign');

//main buttons
const btn0 = document.getElementById('btn0');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btn7 = document.getElementById('btn7');
const btn8 = document.getElementById('btn8');
const btn9 = document.getElementById('btn9');

//M-buttons
const btnMemoryClear = document.getElementById('btnMemoryClear');
const btnMemoryRecall = document.getElementById('btnMemoryRecall');
const btnMemorySubtract = document.getElementById('btnMemorySubtract');
const btnMemoryAdd = document.getElementById('btnMemoryAdd');

//root and square operations
const btnSquareRoot = document.getElementById('btnSquareRoot');
const btnCubicRoot = document.getElementById('btnCubicRoot');
const btnPower2 = document.getElementById('btnPower2');
const btnPower3 = document.getElementById('btnPower3');
const btnPowerY = document.getElementById('btnPowerY');
const btnTenPowerX = document.getElementById('btnTenPowerX');
const btnOneDivideOnX = document.getElementById('OneDivideOnX');

//additional buttons
const btnDelete = document.getElementById('btnDelete');
const btnClear = document.getElementById('btnClear');
const btnEnter = document.getElementById('btnEnter');

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