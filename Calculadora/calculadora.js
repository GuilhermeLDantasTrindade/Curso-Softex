const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{

    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""

    }
    
    addDigt(digit){

        console.log(digit);
        
        if (digit === "," && this.currentOperationText.innerText.includes(",")) {
            return;
          }
      
          this.currentOperation = digit;
          this.updateScreen();
    }
   
   
    
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        
        if(operationValue  === null){
            this.currentOperationText.innerText += this.currentOperation; 
        }else{
    
            if(previous === 0){
                operationValue = current
            }
            // jogar o valor de baixo para cima
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = ""
        }
        



    }
    
    processOperation(operation){
      
        let operationValue
        let previous = + this.previousOperationText.innerText.split(" ")[0]; 
        let current = + this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous+current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous-current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous*current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous/current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            
            case "=":
                this.processEqualOperator();
                break;
            default:
               return;
    
        }
    }
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];
        
        this.processOperation(operation);
    }
}   
const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{

        const value = e.target.innerText

        if(+value>=0 || value === ","){
            calc.addDigt(value)
        }else{
            calc.processOperation(value)
            //console.log("Op:" + value);
        }

    })
    
});