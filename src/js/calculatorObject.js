import { Calculator } from './calculator';

export const current = document.getElementById('displayCurrent');
export const operations = document.getElementById('displayOperations');

//Calculator object initialization
const calculatorObject = new Calculator(0);

export const calculator = new Proxy(calculatorObject, {
  set: function (target, key, value) {
    target[key] = value;
    console.log(target);
    current.innerText = calculator.currentValue;
    operations.innerText = calculator.operations;     
    return true;
  }
});