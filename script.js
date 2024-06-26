document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = Array.from(document.getElementsByTagName("button"));
  const themeToggler = document.getElementById("theme-toggler");
  const calculator = document.getElementById("calculator");
  let currentInput = "";
  let previousInput = "";
  let operator = "";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const value = e.target.id;
      handleInput(value);
    });
  });

  themeToggler.addEventListener("click", () => {
    calculator.classList.toggle("dark");
    calculator.classList.toggle("light");

    const icon = themeToggler.querySelector(".fa-regular");
    if (calculator.classList.contains("dark")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  });

  function handleInput(value) {
    switch (value) {
      case "clear":
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay();
        break;
      case "backspace":
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
        break;
      case "equal":
        if (currentInput && previousInput && operator) {
          try {
            currentInput = eval(
              `${previousInput}${operator}${currentInput}`
            ).toString();
            operator = "";
            previousInput = "";
            updateDisplay();
          } catch {
            display.textContent = "Error";
          }
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (currentInput) {
          if (operator) {
            previousInput = eval(
              `${previousInput}${operator}${currentInput}`
            ).toString();
          } else {
            previousInput = currentInput;
          }
          currentInput = "";
          operator = value;
          updateDisplay();
        }
        break;
      case "(":
      case ")":
        currentInput += value;
        updateDisplay();
        break;
      default:
        if (!isNaN(value)) {
          currentInput += value;
          updateDisplay();
        }
        break;
    }
  }

  function updateDisplay() {
    display.textContent = currentInput || previousInput || "0";
  }
});
