class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.currentoperator = '';
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return;
    if(this.previousOperand !== '') {
      this.compute();
    }
    this.currentoperator = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    console.log(prev);
    console.log(curr);
    if(isNaN(prev) || isNaN(curr)) return;

    switch (this.currentoperator) {
      case '+':
        computation = prev + curr
        break;
      case '-':
        computation = prev - curr
        break;
      case 'x':
        computation = prev * curr
        break;
      case '/':
        computation = prev / curr
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.currentoperator = '';
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand + " " + this.currentoperator + " ";

  }
}

const numberButtons = document.querySelectorAll('.data-number');
const operandButtons = document.querySelectorAll('.data-operand');
const clearButton = document.querySelector('#data-all-clear');
const equalsButton = document.querySelector('#data-equals');
const deleteButton = document.querySelector('.data-all-delete');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})
