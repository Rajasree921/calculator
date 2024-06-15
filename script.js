const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn, .btn-op');
let currentValue = '0';
let operator = null;
let prevValue = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value >= '0' && value <= '9') {
      updateDisplay(value);
    } else if (value === '.') {
      addDecimal();
    } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
      handleOperator(value);
    } else if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearCalculator();
    } else if (value === '%') {
      calculatePercentage();
    } else if (value === '←') {
      removeLastDigit();
    }
  });
});

function updateDisplay(value) {
  if (currentValue === '0') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.textContent = currentValue;
}

function addDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    display.textContent = currentValue;
  }
}

function handleOperator(op) {
  if (prevValue !== null) {
    calculateResult();
  }
  operator = op;
  prevValue = parseFloat(currentValue);
  currentValue = '0';
}

function calculateResult() {
  const currentValueNum = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = prevValue + currentValueNum;
      break;
    case '-':
      result = prevValue - currentValueNum;
      break;
    case '×':
      result = prevValue * currentValueNum;
      break;
    case '÷':
      result = prevValue / currentValueNum;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  prevValue = null;
  display.textContent = currentValue;
}

function clearCalculator() {
  currentValue = '0';
  operator = null;
  prevValue = null;
  display.textContent = currentValue;
}

function calculatePercentage() {
  if (prevValue !== null) {
    const percentage = (parseFloat(currentValue) / 100) * prevValue;
    currentValue = percentage.toString();
    display.textContent = currentValue;
  }
}

function removeLastDigit() {
  currentValue = currentValue.slice(0, -1);
  if (currentValue === '') {
    currentValue = '0';
  }
  display.textContent = currentValue;
}