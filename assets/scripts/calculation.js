const displayText = document.getElementById("display-text");
const buttons = document.getElementsByTagName("button");
const signLayouts = document.getElementsByClassName("operator-sign");
const AC = document.getElementById("ac");
const DEL = document.getElementById("del");

const digit = [...buttons].filter((v) => {
  return v.dataset.value != undefined;
});

const operatorButtons = [...buttons].filter((v) => {
  return v.dataset.operator;
});

let digitInput = [];
let readyToNum1 = true;
let num1;
let operatorSign;
let readyToNum2 = false;
let num2;
let readyToCalculate = false;
let result;

// click digit button and display on screen
digit.map((v) => {
  v.addEventListener("click", () => {
    digitInput.push(v.dataset.value);
    displayText.value = digitInput.join("");
    displayText.dispatchEvent(new Event("change"));
  });
});

/* Main Calculation Process::
  step-1: store first number.
  step-2: get operator and ready for second number when operator is clicked.
  step-3: store second number and backgroud calculation, finally storing in result.
  step-4: adjust equal button.
*/
displayText.addEventListener("change", () => {
  if (digitInput[0] == 0) {
    digitInput.shift();
  }

  if (readyToNum1) {
    num1 = displayText.value;
  }

  if (readyToNum2) {
    num2 = displayText.value;
    readyToCalculate = true;
  }

  if (readyToCalculate) {
    try {
      result = eval(num1 + operatorSign + num2);
    } catch (error) {
      return;
    }
  }
});

// display operator sign at the top of the screen:
const signLayout = (sign) => {
  [...signLayouts].map((v) => {
    v.classList.add("partials");
    v.classList.remove("fullVisible");
    switch (sign) {
      case "/":
        if (v.textContent == "÷") {
          v.classList.add("fullVisible");
          v.classList.remove("partials");
        }
        break;

      case "*":
        if (v.textContent == "×") {
          v.classList.add("fullVisible");
          v.classList.remove("partials");
        }
        break;

      case "+":
        if (v.textContent == "+") {
          v.classList.add("fullVisible");
          v.classList.remove("partials");
        }
        break;

      case "-":
        if (v.textContent == "-") {
          v.classList.add("fullVisible");
          v.classList.remove("partials");
        }
        break;

      default:
        break;
    }
  });
};

operatorButtons.map((v) => {
  v.addEventListener("click", () => {
    if (readyToCalculate) {
      displayText.value = result;
      num1 = result;
    }
    operatorSign = v.dataset.operator;
    readyToNum1 = false;
    readyToNum2 = true;
    digitInput.length = 0;
    signLayout(operatorSign);

    if (v.dataset.operator == "=") {
      readyToNum1 = true;
      readyToNum2 = false;
      readyToCalculate = false;
    }
  });
});

const initial = () => {
  digitInput.length = 0;
  readyToNum1 = true;
  readyToNum2 = false;
  readyToCalculate = false;
  displayText.value = 0;
  signLayout();
};

AC.addEventListener("click", () => {
  initial();
});

DEL.addEventListener("click", () => {
  // operator first error fixed
  if (num1 == undefined && operatorSign != undefined) {
    return;
  }

  digitInput.pop();
  if (digitInput.length == 0) {
    digitInput.push(0);
  }
  displayText.value = digitInput.join("");
  displayText.dispatchEvent(new Event("change"));
});
