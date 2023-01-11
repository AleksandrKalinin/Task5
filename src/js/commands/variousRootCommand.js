import { BaseClass } from './baseClass';

export default class VariousRootCommand extends BaseClass {

  execute(currentValue) {
    return this.value ** (1 / currentValue)
  }

}