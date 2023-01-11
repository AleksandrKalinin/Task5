export class BaseClass {
  constructor(value) {
    this.value = value;
  }

  undo(){
    return this.value;
  }
}