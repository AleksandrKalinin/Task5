import { BaseClass } from './baseClass';

export default class DivideOneByValueCommand extends BaseClass {

  execute(currentValue) {
    if (currentValue !== 0) {
      return 1 / currentValue;
    } else {
      return 'Деление на 0!'
    }
  }

}