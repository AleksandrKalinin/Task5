import { Calculator } from '../js/calculator';

const calculatorObject = new Calculator(0);

export const calculator = new Proxy(calculatorObject, {
  set: function (target, key, value) {
    target[key] = value;
    return true;
  }
});
