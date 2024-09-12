"use strict";
let displayText = "";
let lhs, operator, rhs;
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
function operate(lhs, operator, rhs) {
  switch (operator) {
    case "+":
      return add(lhs, rhs);
    case "-":
      return subtract(lhs, rhs);
    case "*":
      return multiply(lhs, rhs);
    case "/":
      return divide(lhs, rhs);
    default:
      console.error(`Matching Error: Couldn't Match Operator ${operator}`);
  }
}

let container = document.getElementById("container");
container.addEventListener("click", handleClick);
function handleClick(event) {
  console.log(event.target.id);
  if (!isNaN(event.target.id)) appendToDisplay(event.target.id);
  else
    switch (event.target.type) {
      case "clear":
        clearDisplay();
        break;
      case "backspace":
        console.log("backspaced");
        break;
      case "divide":
        console.log("divided");
        break;
      case "multiply":
        console.log("multiplied");
        break;
      case "subtract":
        console.log("subtracted");
        break;
      case "add":
        console.log("added");
        break;
      case "evaluate":
        console.log("evaluated");
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
  displayText += text;
  display(displayText);
}

function clearDisplay() {
  display("");
}
