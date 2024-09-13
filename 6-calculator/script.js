"use strict";
let displayText = "", lhs, operator, operatorIndex, rhs;
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
function operate() {
  lhs = Number(lhs);
  rhs = Number(rhs);
  switch (operator) {
    case "add":
      return add(lhs, rhs);
    case "subtract":
      return subtract(lhs, rhs);
    case "multiply":
      return multiply(lhs, rhs);
    case "divide":
      return divide(lhs, rhs);
    case "":
      return;
    default:
      console.error(`Matching Error: Couldn't Match Operator ${operator}`);
  }
}

let container = document.getElementById("container");
container.addEventListener("click", handleClick);
function handleClick(event) {
  if (!isNaN(event.target.id)) appendToDisplay(event.target.id);
  else
    switch (event.target.id) {
      case "clear":
        clearDisplay();
        break;
      case "backspace":
        if (displayText === "") return;
        display(displayText.slice(0, -1));
        break;
      case "divide":
        appendToDisplay("÷");
      case "multiply":
        appendToDisplay("×");
      case "subtract":
        appendToDisplay("−")
      case "add":
        appendToDisplay("+")
        operator = event.target.id;
        break;
      case "evaluate":
        rhs = displayText.slice(operatorIndex + 1);
        display(operate());
        break;
      case "decimal":
        console.log("dotted");
        break;
    }
}

function display(text) {
  displayText = text;
  container.querySelector("#display").innerHTML = displayText;
}

function appendToDisplay(text) {
  if (["÷", "×", "−", "+"].includes(text)) {
    lhs = displayText;
    operatorIndex = displayText.length;
  }
  displayText += text;
  display(displayText);
}

function clearDisplay() {
  display("");
}
