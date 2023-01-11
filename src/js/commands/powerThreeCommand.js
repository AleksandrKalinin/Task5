import { BaseClass } from './baseClass';

export default class PowerThreeCommand extends BaseClass {

  execute(currentValue) {
    return currentValue * currentValue * currentValue;
  }

}