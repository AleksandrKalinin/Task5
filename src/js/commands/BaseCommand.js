export class BaseCommand {
  constructor(value) {
    this.value = value;
  }

  undo(){
    return this.value;
  }
}