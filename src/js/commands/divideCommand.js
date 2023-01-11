import { BaseClass } from './baseClass';

export default class DivideCommand extends BaseClass{

  execute(currentValue) {
    if (currentValue !== 0) {
      return this.value / currentValue;
    } else {
      throw new Error('Division by 0!');
    }
  }

}