import { BaseCommand } from './BaseCommand';

export default class SquareRootCommand extends BaseCommand {

  execute(currentValue) {
    return currentValue ** (1 / 2);
  }

}