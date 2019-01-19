"use strict";
//force of habit
const $q = selector => document.querySelector(selector);

let inputField = $q(".container__tel");
let e;

//create a keypress event listener
inputField.addEventListener("keypress", targetElement);

//callback listener
function targetElement(e) {
  let val = e.target;
  if (e.keyCode === 13) {
    init(val);
  }
}

//initializer
function init(val) {
  let numValue = captureValues(val);
  let formatVal = formatFieldNumber(numValue);
  output(formatVal);
  reloadPage();
}

//capture user input value
function captureValues(fieldInput) {
  let inputValues = fieldInput.value;
  return inputValues;
}

//callback function for formatFieldNumber
function fieldValidator(numValue) {
  //validate a number is entered
  if (isNaN(numValue) || numValue === " " || numValue === "")
    alert("please enter a phone number!");
  else if (!isNaN(numValue)) {
    //valideate a length property of 10
    let numLength = numValue.toString();
    if (numLength.length !== 10) {
      alert("please enter a 10 digit phone number!");
    } else if (numLength) return numLength;
  }
}

//format input tel number (xxx)xxx-xxxx
function formatFieldNumber(validField) {
  let numVal = fieldValidator(validField),
    result = numVal.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
  return result;
}

//An acknowledgment for the UI.
//set input field to read-only
function output(strVal) {
  var domElem = $q(".container__display__message");
  const HTML = `<h2>You're phone number is ${strVal}</h2>`;
  inputField.classList.add("--deactivateField");
  //set to read only;
  inputField.readOnly = true;
  inputField.removeEventListener("keypress", targetElement);

  return domElem.insertAdjacentHTML("beforeend", HTML);
}

//a refresh button and display in UI
function createRefreshButton() {
  const container = $q(".container__display__message");
  const btn = document.createElement("BUTTON");
  const textNode = document.createTextNode("REFRESH");
  btn.appendChild(textNode);
  container.appendChild(btn);
}

//page referesher
function reloadPage() {
  createRefreshButton();
  const btn = $q("button");

  btn.addEventListener("click", function() {
    location.reload();
  });
}
