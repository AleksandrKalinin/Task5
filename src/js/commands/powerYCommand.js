import { BaseCommand } from './BaseCommand';

export default class PowerYCommand extends BaseCommand {

  execute(currentValue) {
    return this.value ** currentValue;
  }

}