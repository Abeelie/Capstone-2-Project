import { talk } from "../talk/talk";


const Math = (doMath) => {
  const add = "+";
  const substract = "-";
  const mutiply = "*";
  const divide = "/";

    if (doMath.includes(add) && doMath.includes(substract) && doMath.includes(mutiply) && doMath.includes(divide)) {
        const showResult = `I can only do same operator calculations such as 
                             2 plus 2 plus 2 or 2 times 2 times 2`;
        return talk(showResult)
    }

    else if (doMath.includes("ion")) {
        return talk("Number too large to calculate. Try 100 thousands and below");
    }

    else if (doMath.includes(add)) {
        const removeChar = doMath.replace("+", "")
        const arrayConversion = removeChar.split(' ').map(Number);  
        const filterOut = arrayConversion.filter(value => {
            return !Number.isNaN(value) && value !== 0;
        });
        const result = filterOut.reduce((a, b) => a + b);
        const showResult = `The solution is ${result}`;
        talk(showResult);
        return showResult;
    }

    else if (doMath.includes(substract)) {
        const removeChar = doMath.replace("-", "")
        const arrayConversion = removeChar.split(' ').map(Number);  
        const filterOut = arrayConversion.filter(value => {
            return !Number.isNaN(value) && value !== 0;
        });
        const result = filterOut.reduce((a, b) => a - b);
        const showResult = `The solution is ${result}`;
        talk(showResult);
        return showResult;
    }
    
    else if (doMath.includes(mutiply)) {
        const removeChar = doMath.replace("*", "")
        const arrayConversion = removeChar.split(' ').map(Number);  
        const filterOut = arrayConversion.filter(value => {
            return !Number.isNaN(value) && value !== 0;
        });
        const result = filterOut.reduce((a, b) => a * b);
        const showResult = `The solution is ${result}`;
        talk(showResult);
        return showResult;
    }
    
    else if (doMath.includes(divide) || doMath.includes("divided by")) {
        const removeChar = doMath.replace("divided by", "")
        const arrayConversion = removeChar.split(' ').map(Number);  
        const filterOut = arrayConversion.filter(value => {
            return !Number.isNaN(value) && value !== 0;
        });
        const result = filterOut.reduce((a, b) => a / b);
        const showResult = `The solution is ${result}`;
        talk(showResult);
        return showResult;
    }
    
    else if(!doMath.includes(add) || !doMath.includes(substract) || !doMath.includes(mutiply) || !doMath.includes(divide)){
        talk(`I am sorry, I can only do addition, subtraction, mutiplication, 
              and division`)
    }
}



export { Math }