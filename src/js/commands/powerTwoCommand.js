import { BaseCommand } from './BaseCommand';

export default class PowerTwoCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue * currentValue;
  }

}