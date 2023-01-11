import { BaseClass } from './baseClass';

export default class SubtractCommand extends BaseClass {

  execute(currentValue) {
    return this.value - currentValue;
  }

}