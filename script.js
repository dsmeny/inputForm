"use strict";
const $q = selector => document.querySelector(selector);

let inputField = $q(".container__tel");
let e;

//create a keypress listener
inputField.addEventListener("keypress", targetElement);

//listener callback
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

function captureValues(fieldInput) {
  //capture input value and store it
  let inputValues = fieldInput.value;
  return inputValues;
}

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

//format number field
function formatFieldNumber(validField) {
  let numVal = fieldValidator(validField),
    result = numVal.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
  return result;
}

//create an output element and display form number
//replace label message with achknowledgement
function output(strVal) {
  var domElem = $q(".container__display__message");
  const HTML = `<h2>You're phone number is ${strVal}</h2>`;
  inputField.classList.add("--deactivateField");
  //set to read only;
  inputField.readOnly = true;
  inputField.removeEventListener("keypress", targetElement);

  return domElem.insertAdjacentHTML("beforeend", HTML);
}

//create refresh button and display in UI
function createRefreshButton() {
  const container = $q(".container__display__message");
  const btn = document.createElement("BUTTON");
  const textNode = document.createTextNode("REFRESH");
  btn.appendChild(textNode);
  container.appendChild(btn);
}

function reloadPage() {
  createRefreshButton();
  const btn = $q("button");

  btn.addEventListener("click", function() {
    location.reload();
  });
}
