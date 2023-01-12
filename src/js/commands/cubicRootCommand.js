import { BaseCommand } from './BaseCommand';

export default class CubicRootCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue ** (1 / 3);
  }

}