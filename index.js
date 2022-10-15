const display = document.querySelector(".display-text");

const keypad = document.querySelector(".keypad");
const zeroKey = document.getElementById("zero-key");
const oneKey = document.getElementById("one-key");
const twoKey = document.getElementById("two-key");
const threeKey = document.getElementById("three-key");
const fourKey = document.getElementById("four-key");
const fiveKey = document.getElementById("five-key");
const sixKey = document.getElementById("six-key");
const sevenKey = document.getElementById("seven-key");
const eightKey = document.getElementById("eight-key");
const nineKey = document.getElementById("nine-key");
const pointKey = document.getElementById("point-key");
const addKey = document.getElementById("add-key");
const subtractKey = document.getElementById("subtract-key");
const multiplyKey = document.getElementById("multiply-key");
const divideKey = document.getElementById("divide-key");
const equalsKey = document.getElementById("equals-key");
const clearKey = document.getElementById("clear-key");
const backspaceKey = document.getElementById("backspace-key");


let displayBuffer = '';
const operatorsRegex = /[+*÷-]/;

function isOperator(char) {
    return (char === '+' || char === '-' || char === '*' || char === '÷');
}

function operate(num1, num2, operator) {
    let result = 0;
    switch (operator) {
        case "+": return Number(num1) + Number(num2);
        case "-": return Number(num1) - Number(num2);
        case "*": return Number(num1) * Number(num2);
        case "÷":
            if (Number(num2) == 0) {return "Can't divide by 0";}
            else {return Number(num1) / Number(num2);}
        default: return "Unknown operator";
    }
}

function processInput() {
    if (display.textContent === '' && this.textContent === '-') {
        displayBuffer = '-';
        display.textContent = displayBuffer;
        return;
    } else if (((display.textContent === ''
                || display.textContent.length == 1 && isOperator(display.textContent[0]))
                && isOperator(this.textContent))) {
        return;
    } else if (isOperator(this.textContent)
            && isOperator(display.textContent[display.textContent.length-1])) {
        displayBuffer = displayBuffer.substring(0, displayBuffer.length -1) + this.textContent;
        display.textContent = displayBuffer;
        return;
    } else if (isOperator(this.textContent) 
            && operatorsRegex.test(display.textContent.slice(1))) {
        let operands = [];
        let result = 0;
        let operator;

        if (displayBuffer.includes("+")) {
            operator = "+";            
            operands = displayBuffer.split("+");
            result = operate(operands[0], operands[1], operator);
        } else if (displayBuffer.includes("÷")) {
            operator = "÷";    
            operands = displayBuffer.split("÷");
            result = operate(operands[0], operands[1], operator);

        } else if (displayBuffer.includes("*")) {
            operator = "*";    
            operands = displayBuffer.split("*");
            result = operate(operands[0], operands[1], operator);
        } else if (displayBuffer.includes("-")) {
            if (displayBuffer[0] === '-') {
                operands = displayBuffer.slice(1).split("-");
                operands[0] *= -1;
            } else {
                operands = displayBuffer.split("-");
            }
            operator = "-";    
            result = operate(operands[0], operands[1], operator);
        } else {
            display.textContent = "Error in processInput()";    
            return;
        }
        display.textContent = result + this.textContent;
        displayBuffer = String(display.textContent);
 
    } else {
        displayBuffer += String(this.textContent);
        display.textContent = displayBuffer;
    }
}

zeroKey.addEventListener("click", processInput);
oneKey.addEventListener("click", processInput);
twoKey.addEventListener("click", processInput);
threeKey.addEventListener("click", processInput);
fourKey.addEventListener("click", processInput);
fiveKey.addEventListener("click", processInput);
sixKey.addEventListener("click", processInput);
sevenKey.addEventListener("click", processInput);
eightKey.addEventListener("click", processInput);
nineKey.addEventListener("click", processInput);

addKey.addEventListener("click", processInput);
subtractKey.addEventListener("click", processInput);
multiplyKey.addEventListener("click", processInput);
divideKey.addEventListener("click", processInput);

equalsKey.addEventListener("click", ()=> {

    if (displayBuffer == '') return;
    if (isOperator(display.textContent[display.textContent.length-1])) {
        return;}

    let operands = [];
    let result = 0;

    if (isOperator(displayBuffer[0])) {
        if (!(operatorsRegex.test(display.textContent.slice(1)))
                || display.textContent === '') return;
    } else if (!(operatorsRegex.test(display.textContent))
    || display.textContent === '') return;

    if (displayBuffer.includes("+")) {
        operands = displayBuffer.split("+");
        result = operate(operands[0], operands[1], "+");
    } else if (displayBuffer.includes("÷")) {
        operands = displayBuffer.split("÷");
        result = operate(operands[0], operands[1], "÷");
    } else if (displayBuffer.includes("*")) {
        operands = displayBuffer.split("*");
        result = operate(operands[0], operands[1], "*");
    } else if (displayBuffer.includes("-")) {
        if (displayBuffer[0] === "-"){  //negative first number
            displayBuffer = displayBuffer.slice(1);
            operands = displayBuffer.split("-");
            operands[0] *= -1;
        } else {
            operands = displayBuffer.split("-");
        }
        result = operate(operands[0], operands[1], "-");
    } else {
        display.textContent = "Error! No operator!"
        return;
    }

    display.textContent = result;
    displayBuffer = String(display.textContent);
});

clearKey.addEventListener("click", () => {
    displayBuffer = '';
    display.textContent = displayBuffer;
});

backspaceKey.addEventListener("click", ()=> {
    if (displayBuffer === '') return;
    else {
        displayBuffer = displayBuffer.slice(0, (displayBuffer.length -1));
        display.textContent = displayBuffer;
    }
});

pointKey.addEventListener("click", ()=> {
    if(displayBuffer === '') {
        displayBuffer = '0.';
        display.textContent = displayBuffer;
        return;
    } else if(!displayBuffer.includes('.')) {
        displayBuffer = displayBuffer + '.';
        display.textContent = displayBuffer;
        return;    
    } else if (displayBuffer[0] !== '-' && operatorsRegex.test(displayBuffer)) {
        operands = displayBuffer.split(operatorsRegex);
        if(!operands[1].includes('.')) {
            displayBuffer = displayBuffer + '.';
            display.textContent = displayBuffer;
            return;
        }
    } else if (operatorsRegex.test(displayBuffer.slice(1))) {
        operands = displayBuffer.slice(1).split(operatorsRegex);
        if(!operands[1].includes('.')) {
            displayBuffer = displayBuffer + '.';
            display.textContent = displayBuffer;
        }
    } 
});