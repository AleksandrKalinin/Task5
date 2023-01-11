import { BaseClass } from './baseClass';

export default class CubicRootCommand extends BaseClass {

  execute(currentValue) {
    return currentValue ** (1 / 3);
  }

}