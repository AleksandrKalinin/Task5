import { BaseCommand } from './BaseCommand';

export default class MultiplyCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue * this.value;
  }

}