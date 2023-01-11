import { BaseCommand } from './BaseCommand';

export default class VariousRootCommand extends BaseCommand {

  execute(currentValue) {
    return this.value ** (1 / currentValue)
  }

}