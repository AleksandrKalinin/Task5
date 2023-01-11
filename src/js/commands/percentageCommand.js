import { BaseClass } from './baseClass';

export default class PercentageCommand extends BaseClass {

  execute(currentValue) {
    return currentValue / 100 * this.value;
  }
 
}