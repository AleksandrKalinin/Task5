import { BaseClass } from './baseClass';

export default class ModCommand extends BaseClass {

  execute(currentValue) {
    if (currentValue !== 0) {
      return this.value % currentValue;
    } else {
      return this.value;
    }
  }

}