import { BaseClass } from './baseClass';

export default class PowerTwoCommand extends BaseClass {

  execute(currentValue) {
    return currentValue * currentValue;
  }

}