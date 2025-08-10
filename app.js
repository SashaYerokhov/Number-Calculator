// Переключение тем калькулятора
// https://dev.to/jimajs/how-to-create-a-three-state-toggle-switch-using-html-css-and-javascript-2e68

const toggls = document.querySelectorAll('.toggle input');

toggls.forEach((toggle, index) => {
    toggle.addEventListener('click', (event) => {
        if (toggls[0].checked) {
            document.body.classList.remove('white-theme')
            document.body.classList.remove('black-theme');
        } else if (toggls[1].checked) {
            document.body.classList.add('white-theme');
            document.body.classList.remove('black-theme');
        } else if (toggls[2].checked) {
            document.body.classList.remove('white-theme');
            document.body.classList.add('black-theme');
        }
    })
})

// Работа калькулятора

/**
 * При нажиме на кнопки калькулятора на дисплее должно показываться
 * результат ввода, что сейчас выведено на дисплей должно быть удаляться
 * перменные для цифр
 * переменные для арифмитических действий,
 * переменные для очистки дисплея и удаления для последнего символа
 * пеменные для экрана дисплея
 */

const calculator = document.querySelector(".calculator");
const displayCur = document.querySelector("#cur-operand");
const displayPrev = document.querySelector("#prev-operand");
const numberKye = document.querySelectorAll(".number_kye");
const operatorBtn = document.querySelectorAll(".operator__btn");
const delButtons = document.getElementById("del");
const dotButtons = document.getElementById("dot");
const resetButtons = document.getElementById("reset");
const equalsButtons = document.getElementById("equals");

numberKye.forEach((key) => {
  key.addEventListener("click", () => {
    appendNumber(key.innerText);
    updateDisplay();
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

delButtons.addEventListener("click", deleteNumber);
resetButtons.addEventListener("click", reset);
equalsButtons.addEventListener("click", compute);
dotButtons.addEventListener("click", appendDot);

// Эти функции должны быть определены для выполнения соответствующих действий, которые включают очистку дисплея, удаление последнего ввода, вычисление результата и добавление десятичной точки.

function appendDot() {
  if (curOperand.includes(".")) return;
  //
  if (curOperand === "") curOperand = "0";
  //
  curOperand += ".";
  updateDisplay();
}

let curOperand = "";
let prevOperand = "";
let operation = null;
let displayHasInitialValue = true; // Флаг, что на дисплее начальное значение

function appendNumber(key) {
  // Если на дисплее начальное значение (или после =), очищаем его
  if (displayHasInitialValue) {
    curOperand = "";
    displayHasInitialValue = false;
  }
  if (key === "." && curOperand.includes(".")) return;
  curOperand += key;
  updateDisplay();
}

// function appendNumber(key) {
//   if (key === "." && curOperand.includes(".")) return;
//   // предотвратить множественные десятичные знаки
//   curOperand = curOperand.toString() + key.toString();
// }
// В этой функции мы конкатенируем щелкнутое число с текущим операндом. Мы также проверяем, чтобы не добавить более одной десятичной точки.

// Когда пользователь нажимает на кнопку операции, нам нужно установить выбранную операцию и при необходимости переместить текущий операнд на предыдущий. Вот функция chooseOperation:
function chooseOperation(selectedOperation) {
  if (curOperand === "") return;
  if (prevOperand !== "") {
    compute();
  }
  operation = selectedOperation;
  prevOperand = curOperand;
  curOperand = "";
  isNewCalculation = false;
}
// Эта функция устанавливает операцию, перемещает CurrentOperand в PreviousOperand и очищает CurrentOperand для следующего ввода. Она также вызывает compute, если операция уже находится в процессе выполнения, что позволяет выполнять операции в цепочке.

// Функция compute выполняет вычисления на основе выбранной операции и операндов:

function compute() {
  let computation;
  const prev = parseFloat(prevOperand);
  const current = parseFloat(curOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }
 // Округляем до 10 знаков, затем убираем лишние нули (например, 0.3000000000 → 0.3)
  computation = parseFloat(computation.toFixed(10)); // Округляет и убирает лишние нули
  curOperand = computation.toString();
  operation = undefined;
  prevOperand = "";
  displayHasInitialValue = true; // Устанавливаем флаг, что вычисление завершено
  updateDisplay();
  // Обновите дисплей с новым состоянием
}
// Эта функция преобразует операнды в числа, выполняет вычисления на основе операции и обновляет currentOperand результатом.

// Чтобы отразить изменения на дисплее, нам нужно обновить функцию updateDisplay, упомянутую в шаге 4:

function updateDisplay() {
  document.getElementById("cur-operand").innerText = curOperand;
  document.getElementById("prev-operand").innerText =
    prevOperand + "" + (operation || "");
}
// This function updates the calculator's display with the current and previous operands, and shows the chosen operation next to the previous operand.

function reset() {
  curOperand = "";
  prevOperand = "";
  operation = null;
  displayHasInitialValue = true;
  updateDisplay();
}
// Когда нажимается кнопка очистки (AC), запускается эта функция, которая сбрасывает CurrentOperand, PreviousOperand и Operation, а затем обновляет дисплей.

// Функция deleteNumber удаляет последнюю цифру из текущего операнда, предоставляя пользователям возможность исправить ошибки:
function deleteNumber() {
  curOperand = curOperand.toString().slice(0, -1);
  updateDisplay();
}

// Нам нужен способ обрабатывать нажатия на кнопки с цифрами и добавлять нажатое число к текущему отображению. Вот как мы можем реализовать функцию appendNumber, о которой мы говорили в шаге 4:

// https://hackr.io/blog/how-to-build-a-javascript-calculator
// Доделать работу калькулятора с клавиатуры