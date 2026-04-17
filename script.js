const btns = document.querySelectorAll(".btn");
const input = document.querySelector("#val");

let prevDigit = null; let result = null; let currDigit = null
let digit = []; let lastOp = -1

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        try {
            let target = e.target
            let value = target.textContent

            if (value == "AC") {

                input.textContent = "0"
                digit = []
                prevDigit = null
                currDigit = null
                return

            }
            else if (value == "+/−") {

                let num = digit.join("")

                if (num.length == 1 || num.length == 2) {
                    if (num.startsWith("-")) {
                        num = "+" + (num.slice(1))
                    } else {
                        num = "-" + num
                    }
                } else {
                    num = num.slice(0, num.length - 2) + (
                        num.slice(num.length - 2).startsWith("+")
                            ? `-${num.slice(num.length - 1)}`
                            : `+${num.slice(num.length - 1)}`
                    );
                }

                digit = []
                digit.push(num)
                input.textContent = num

            }
            else if (value == "=") {

                let finalExpression = digit.join("")
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-")

                result = eval(finalExpression)
                input.textContent = result

                prevDigit = result
                digit = []

            }
            else {
                if (prevDigit != null && isNaN(value)) {
                    digit.push(prevDigit.toString())
                } else if (prevDigit != null & !isNaN(value)) {
                    digit = []
                    input.textContent = ""
                }

                prevDigit = null
                digit.push(value)

                input.textContent = digit.join("")
            }
        }
        catch (err) {
            input.textContent = "Math Error"
            digit = []
        }

    });
});