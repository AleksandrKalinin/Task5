import { BaseClass } from './baseClass';

export default class PowerYCommand extends BaseClass {

  execute(currentValue) {
    return this.value ** currentValue;
  }

}