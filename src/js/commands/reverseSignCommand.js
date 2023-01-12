import { BaseCommand } from './BaseCommand';

export default class ReverseSignCommand extends BaseCommand {

  execute(currentValue) {
    return 0 - currentValue;
  }

}