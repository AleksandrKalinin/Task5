import { BaseCommand } from './BaseCommand';

export default class TenPowerCommand extends BaseCommand {

  execute(currentValue) {
    let result = 1;
    for (let i = 0; i < currentValue; i++) {
      result *= 10;
    }
    return result;
  }

}