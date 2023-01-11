import { BaseCommand } from './BaseCommand';

export default class DivideCommand extends BaseCommand{

  execute(currentValue) {
    if (currentValue !== 0) {
      return this.value / currentValue;
    } else {
      throw new Error('Division by 0!');
    }
  }

}