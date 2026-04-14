const btns = document.querySelectorAll(".btn");
const input = document.querySelector("#val");

let prevDigit = null; let result = null ; let currDigit = null
let digit = [] 

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
            else if(value == "+/−") {

                let curr = input.textContent
                if(curr == "0" || curr == "") return

                let negated = (parseFloat(curr) * -1).toString()
                
                digit = [negated]
                input.textContent = negated
                
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
                if (prevDigit != null) {
                    if(isNaN(value)){
                        digit.push(value)
                    }else{
                        input.textContent = ""
                    }

                    prevDigit = null
                }

                digit.push(value)
                
                input.textContent = digit.join("")
            }
        }
        catch(err) {
            input.textContent = "Math Error"
            digit = []
        }

    });
});