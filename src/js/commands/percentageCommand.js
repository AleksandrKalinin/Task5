import { BaseCommand } from './BaseCommand';

export default class PercentageCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue / 100 * this.value;
  }
 
}