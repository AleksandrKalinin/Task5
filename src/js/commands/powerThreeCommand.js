import { BaseCommand } from './BaseCommand';

export default class PowerThreeCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue * currentValue * currentValue;
  }

}