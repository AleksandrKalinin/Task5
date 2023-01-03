export class FactorialCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    if (this.value <= 170 ) {
      let factorial = 1;
      for(let i = 1; i <= this.value; i++) {
        factorial *= i;
      }    
      return factorial;
    }
    return 'Too big!';
  }

  undo(currentValue) {
    let val = currentValue;
    let num = 1;    
    while(val > 1) {
      num++
      val = val / num;
    } 
    return num;
  }

}