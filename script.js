const currentDisplay = document.getElementById('current-display');
const historyDisplay = document.getElementById('history');
let currentInput = '';
let operator = '';
let previousInput = '';
let history = [];

function updateDisplay(value) {
  currentDisplay.textContent = value.length > 9 ? value.substring(0, 9) : value;
}

function updateHistory(newEntry) {
  history.push(newEntry);
  historyDisplay.textContent = history.slice(-1)[0];
}

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    const value = button.getAttribute('data-value');

    if (action === 'clear') {
      currentInput = '';
      operator = '';
      previousInput = '';
      updateDisplay('0');
      history = [];
      historyDisplay.textContent = '';
    } else if (action === 'delete') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    } else if (action === 'calculate') {
      if (previousInput && operator && currentInput) {
        const result = eval(`${previousInput}${operator}${currentInput}`);
        updateHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
        updateDisplay(result.toString());
        previousInput = result.toString();
        currentInput = '';
        operator = '';
      }
    } else if (action === 'percent') {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        previousInput = currentInput;
        operator = value;
        currentInput = '';
      }
    } else if (['sin', 'cos', 'tan', 'sqrt'].includes(action)) {
      if (currentInput) {
        let result;
        if (action === 'sin') result = Math.sin(parseFloat(currentInput));
        if (action === 'cos') result = Math.cos(parseFloat(currentInput));
        if (action === 'tan') result = Math.tan(parseFloat(currentInput));
        if (action === 'sqrt') result = Math.sqrt(parseFloat(currentInput));
        updateHistory(`${action}(${currentInput}) = ${result}`);
        updateDisplay(result.toString());
        currentInput = result.toString();
      }
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});
