var Calculator = (function () {

    function Calculator(state) {
        this._state = state || null;
    }

    Calculator.prototype.set = function (state) {
        this._state = state;
    };

    Calculator.prototype.execute = function () {
        if (!this._state || !this._state.execute)
            console.error("No state defined.");
        else
            return this._state.execute.apply(this, arguments);
    };

    return Calculator;
})();

var Add = (function () {

    function Add() {}

    Add.prototype.execute = function (x, y) {
        return x + y;
    };

    return Add;
})();

var Subtract = (function () {

    function Subtract() {}

    Subtract.prototype.execute = function (x, y) {
        return x - y;
    };

    return Subtract;
})();

var Multiply = (function () {

    function Multiply() {}

    Multiply.prototype.execute = function (x, y) {
        return x * y;
    };

    return Multiply;
})();

var Divide = (function () {

    function Divide() {}

    Divide.prototype.execute = function (x, y) {
        return x / y;
    };

    return Divide;
})();

var calculator = new Calculator();
calculator.execute();

calculator.set(new Add());
console.log( calculator.execute(1,2) );

calculator.set(new Multiply());
console.log( calculator.execute(1,2) );

calculator.set(new Divide());
console.log( calculator.execute(1,2) );

calculator.set(new Subtract());
console.log( calculator.execute(1,2) );