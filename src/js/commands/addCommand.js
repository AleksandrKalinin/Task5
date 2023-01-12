import { BaseCommand } from './BaseCommand';

export default class AddCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue + this.value;
  }

}