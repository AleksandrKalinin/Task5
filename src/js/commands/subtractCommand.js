import { BaseCommand } from './BaseCommand';

export default class SubtractCommand extends BaseCommand {

  execute(currentValue) {
    return this.value - currentValue;
  }

}