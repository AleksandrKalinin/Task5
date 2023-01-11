import { BaseClass } from './baseClass';

export default class DivideOneByValueCommand extends BaseClass {

  execute(currentValue) {
    if (currentValue !== 0) {
      return 1 / currentValue;
    } else {
      throw new Error('Division by 0!');
    }
  }

}