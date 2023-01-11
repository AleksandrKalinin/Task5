import { BaseClass } from './baseClass';

export default class TenPowerCommand extends BaseClass {

  execute(currentValue) {
    let result = 1;
    for (let i = 0; i < currentValue; i++) {
      result *= 10;
    }
    return result;
  }

}