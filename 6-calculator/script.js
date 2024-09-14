"use strict";
let displayText = "", lhs, rhs;
let operator, operatorIndex, operatorSelected = false;
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
function operate() {
  if (lhs == "" || !operatorSelected || rhs == "") {
    logError("Invalid Operation");
    return lhs;
  }
  let lhsNum = Number(lhs);
  let rhsNum = Number(rhs);
  switch (operator) {
    case "add":
      return add(lhsNum, rhsNum);
    case "subtract":
      return subtract(lhsNum, rhsNum);
    case "multiply":
      return multiply(lhsNum, rhsNum);
    case "divide":
      if (rhsNum === 0) {
        logError("Can't Divide By 0");
        return;
      }
      return divide(lhsNum, rhsNum);
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
        logError("");
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
  lhs = operate()
  if (lhs != undefined && lhs != "")
    lhs = Number(Number(lhs).toFixed(4)).toString();
  display(lhs);
  rhs = "";
  operator = "";
  operatorIndex = null;
}

function logError(err) {
  container.querySelector("#error").innerHTML = err;
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
  logError("");
  lhs = rhs = displayText = operator = "";
  operatorIndex = undefined;
  operatorSelected = false;
}
