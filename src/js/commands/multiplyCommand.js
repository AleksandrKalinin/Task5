import { BaseClass } from './baseClass';

export default class MultiplyCommand extends BaseClass {

  execute(currentValue) {
    return currentValue * this.value;
  }

}