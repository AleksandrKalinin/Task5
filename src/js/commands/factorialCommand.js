import { BaseClass } from './baseClass';

export default class FactorialCommand extends BaseClass {

  execute(currentValue) {
    if (this.value <= 170 ) {
      let factorial = 1;
      for(let i = 1; i <= this.value; i++) {
        factorial *= i;
      }    
      return factorial;
    } else {
      throw new Error('Number is too big!');
    }
  }

}