"use strict";
let displayText = "", lhs, operator, operatorIndex, operatorSelected = false, rhs;
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
function operate() {
  lhs = Number(lhs);
  rhs = Number(rhs);
  switch (operator) {
    case "add":
      return lhs = add(lhs, rhs);
    case "subtract":
      return lhs = subtract(lhs, rhs);
    case "multiply":
      return lhs = multiply(lhs, rhs);
    case "divide":
      return lhs = divide(lhs, rhs);
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
        appendToDisplay("÷", event);
        break;
      case "multiply":
        appendToDisplay("×", event);
        break;
      case "subtract":
        appendToDisplay("−", event);
        break;
      case "add":
        appendToDisplay("+", event)
        break;
      case "evaluate":
        evaluate();
        break;
      case "decimal":
        console.log("dotted");
        break;
    }
}

function evaluate() {
  lhs = displayText.slice(0, operatorIndex);
  rhs = displayText.slice(operatorIndex + 1);
  operate()
  display(lhs);
  rhs = "";
  operator = "";
  operatorIndex = null;
}

function display(text) {
  displayText = text;
  container.querySelector("#display").innerHTML = displayText;
}

function appendToDisplay(text, event) {
  if (["÷", "×", "−", "+"].includes(text)) {
    if (operatorSelected) {
      evaluate();
      operatorSelected = false;
    }
    operator = event.target.id
    operatorIndex = displayText.toString().length;
    operatorSelected = true;
  }
  displayText += text;
  display(displayText);
}

function clearDisplay() {
  display("");
}
