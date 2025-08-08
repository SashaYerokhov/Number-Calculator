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

const keys = document.querySelectorAll('.key');
// console.log(keys);

const operators = document.querySelectorAll('.operator__btn');
const display = document.querySelector('#display');
// console.log(display.innerText);
const del = document.querySelector('.color-del');

const reset = document.querySelector('.color-rezet');
// console.log(reset); 

// точка ввыдиться больше одного раза, а нужно только один раз
keys.forEach((key) => {
    key.addEventListener('click', function(event) {
        if (display.innerText === '0' && event.target.innerText !== '.') {
            display.innerText = event.target.innerText;
        } else {
            display.innerText += event.target.innerText;
        }
            })
})

// удаление одного символа
del.addEventListener('click', (event) => {
    delNumber();
});
function delNumber() {
    display.innerText = display.innerText.slice (0, -1);
         if(display.innerText === '') {
            display.innerText = '0'
                }
}

// очистка дисплея от данных
reset.addEventListener('click', (event) => {
    clearDisplay();
});
function clearDisplay() {
    display.textContent = '0';
   
}


// buttons.forEach((button) => {
//     button.addEventListener('click', function(event) {
//         switch (event.target.innerText) {
//             case 'RESET':
//                 display.innerText = '0';
//                 break;
//             case 'DEL':
//                 display.innerText = display.innerText.slice(0, -1);
//                 if(display.innerText === '') {
//                     display.innerText = '0'
//                 }
//                 break;        
//             default:
//                          display.innerText === '0' && event.target.innerText !== '.'
//                         ? (display.innerText = event.target.innerText)
//                         : (display.innerText += event.target.innerText)
//                 break;
//         }
//     })
// })