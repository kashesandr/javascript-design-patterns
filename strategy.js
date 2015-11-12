
var Strategy = (function () {

    function Strategy() {
        this._methods = {
            method: function (x, y) {
                return x + y;
            },
            method2: function (x, y) {
                return x - y;
            }
        };
    }

    Strategy.prototype.set = function (name, method) {
        if (method && name && typeof name == 'string' && typeof method == 'function') {
            this._methods[name] = method;
        }
        return this;
    };

    Strategy.prototype.unset = function (name) {
        if (name && this._methods[name]) {
            delete this._methods[name];
        }
        return this;
    };

    Strategy.prototype.execute = function (method, x, y) {
        if (this._methods[method] !== undefined) {
            return this._methods[method](x, y);
        } else {
            throw new Error('No such method: ' + method);
        }
    };

    return Strategy;
})();

var calculator = new Strategy();
calculator.set('method', function(a,b){return a-b});

var result = calculator.execute('method', 1, 2);
console.log(result);