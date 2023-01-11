import { BaseClass } from './baseClass';

export default class SquareRootCommand extends BaseClass {

  execute(currentValue) {
    return currentValue ** (1 / 2);
  }

}