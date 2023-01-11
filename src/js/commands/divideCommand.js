import { BaseClass } from './baseClass';

export default class DivideCommand extends BaseClass{

  execute(currentValue) {
    if (currentValue !== 0) {
      return this.value / currentValue;
    } else {
      return 'Деление на 0!'
    }
  }

}