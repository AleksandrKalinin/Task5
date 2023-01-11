import { BaseCommand } from './BaseCommand';

export default class ModCommand extends BaseCommand {

  execute(currentValue) {
    if (currentValue !== 0) {
      return this.value % currentValue;
    } else {
      return this.value;
    }
  }

}