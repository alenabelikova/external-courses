function Calculator(){
    var value=0;
    async function fetchData(callback){ 
        var cb = await callback();   
        value=cb;
      }
     function getResult(){
        return value;
    }
  function setState(num=0){
        value=num;
    }
    function reset(){
        value=0;
        return this;
    }
    function add(num=0){
        value+=num;
        return this;
    }
    function subtract(num=0){
        value-=num;
        return this;
    }
    function divide(num=1){
        value/=num;
        return this;
    }
    function multiply(num=1){
        value*=num;
        return this;
    }
    return {fetchData, getResult, setState, reset, add, subtract, divide, multiply};
}
var calculator = new Calculator();

const result = calculator.add(100)
    .multiply(2)
    .divide(20)
    .reset()
    .subtract(1)
    .getResult();
console.log(result); // -1

calculator.reset();
console.log(calculator.getResult()); //0

calculator.setState(1);
console.log(calculator.getResult()); // 1

var xMLHttpRequest = function(){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(500);
        }, 2000);
      });
};

calculator.fetchData(xMLHttpRequest);
console.log(calculator.getResult());

setTimeout(function(){console.log(calculator.getResult());},2100);