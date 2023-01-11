import { BaseClass } from './baseClass';

export default class ReverseSignCommand extends BaseClass {

  execute(currentValue) {
    return 0 - currentValue;
  }

}