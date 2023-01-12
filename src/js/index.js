import '../sass/main.sass';
import './toggle.js';
import * as commands from './commands';
import { current, operations, calculator } from './calculatorObject';
import { buttons } from './buttons';

function buildDom(elements) {
  const rootContainer = document.getElementById('rootContainer');
  let arr = [];
  for (let i = 0; i < elements.length; i++) {
    const el = document.createElement('span');
    el.innerHTML = elements[i].text;
    el.setAttribute('id', elements[i].id);
    el.className = elements[i].class;
    if (elements[i].value) {
      el.setAttribute('value', elements[i].value);
    }
    arr.push(el);
    if (arr.length === 8 || i === elements.length - 1)  {
      const rowElement = document.createElement('div');
      rowElement.className = 'calculator__row';   
      arr.forEach((item) => {
        rowElement.appendChild(item);
      });
      rootContainer.appendChild(rowElement);
      arr = [];
    } 
  }
}

buildDom(buttons);

//Checking dividing by zero

function checkForError() {
  if (typeof calculator.currentValue === 'string') {
    setTimeout(() => calculator.clear(), 1000)
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
  calculator.executeMemory(new commands.MemoryRecallCommand(calculator.memoryValue));
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
    checkForError();
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
  calculator.execute(command);
  calculator.resetOperations('');
  calculator.updateOperations(calculator.currentValue);
  checkForError();
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
