const digits = document.querySelectorAll('.button-number');

function digitsFunction(e) {
  if (calculator.pending !== null && calculator.value === calculator.currentInput) {
    calculator.resetInput();
  }
  const digit = Number(e.getAttribute('value'));
  calculator.executeInput(new SetValueCommand(digit));  
}

digits.forEach((e) => {
  e.addEventListener('click', () => {
    digitsFunction(e)
  });
})

export default digits;