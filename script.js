const buttons = document.querySelectorAll(".btn");
const input = document.querySelector(".display-val");

let currentValue = "0";
let previousValue = null;
let operator = null;
let waitingForNextValue = false;

function calculate(prev, curr, op) {
    const a = parseFloat(prev);
    const b = parseFloat(curr);
    if (isNaN(a) || isNaN(b)) return "Error";

    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "/": return b === 0 ? "Infinity" : a / b;
        case "*": return a * b;
        default: return b;
    }
}

buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const value = e.target.textContent;

        if (!isNaN(value)) {
            if (currentValue === "0" || waitingForNextValue) {
                currentValue = value; 
                waitingForNextValue = false;
            } else {
                currentValue += value;
            }
        } 
        
        else if (["+", "-", "×", "÷"].includes(value)) {
            const opMap = { "×": "*", "÷": "/" };
            const opSymbol = opMap[value] || value;

            if (operator && !waitingForNextValue) {
                currentValue = calculate(previousValue, currentValue, operator).toString();
            }
        
            previousValue = currentValue;     
            operator = opSymbol;
            waitingForNextValue = true; 
        } 
        
        else if (value === "=") {
            if (operator) {
                currentValue = calculate(previousValue, currentValue, operator).toString();
                previousValue = null;
                operator = null;
                waitingForNextValue = true;
            }
            
        } 

        else if(value === "±"){
            if(currentValue=="0") return
            currentValue = -1 * parseFloat(currentValue);
        }
        
        else if (value === ".") {
            if (!currentValue.includes(".")) currentValue += "."
        } 

        else if(value == "%"){
            currentValue = (parseFloat(currentValue) / 100).toString()
        }
        
        else if (value === "C") {
            currentValue = "0";
            previousValue = null;
            operator = null;
            waitingForNextValue = false;
        }

        input.value = currentValue;
        
    });
});