import { BaseClass } from './baseClass';

export default class AddCommand extends BaseClass {

  execute(currentValue) {
    return currentValue + this.value;
  }

}