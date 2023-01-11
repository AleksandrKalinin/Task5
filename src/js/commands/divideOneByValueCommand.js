import { BaseCommand } from './BaseCommand';

export default class DivideOneByValueCommand extends BaseCommand {

  execute(currentValue) {
    if (currentValue !== 0) {
      return 1 / currentValue;
    } else {
      throw new Error('Division by 0!');
    }
  }

}