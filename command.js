(function(){

    var log = (function () {
        var log = "";
        return {
            add: function (msg) { log += msg + "\n"; },
            show: function () { console.log(log); log = ""; }
        }
    })();

    var Command = function (execute, undo, value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
    };

    var fns = {
        add: function (x, y) { return x + y; },
        sub: function (x, y) { return x - y; },
        mul: function (x, y) { return x * y; },
        div: function (x, y) { return x / y; }
    };

    var Manager = function(){
        return {
            add: function (value) {
                return new Command(fns.add, fns.sub, value);
            },
            sub: function (value) {
                return new Command(fns.sub, fns.add, value);
            },
            mul: function (value) {
                return new Command(fns.mul, fns.div, value);
            },
            div: function (value) {
                return new Command(fns.div, fns.mul, value);
            }
        }
    };

    var Calculator = function (manager) {
        var current = 0;
        var commands = [];

        var action = function (command) {
            var name = command.execute.toString();
            return name.charAt(0).toUpperCase() + name.slice(1);
        };

        return {
            execute: function (cmd) {
                if (!manager[cmd]) {
                    throw new Error("No such method: " + cmd);
                }
                var command = manager[cmd] && manager[cmd].apply( manager, [].slice.call(arguments, 1) );
                var previous = current;
                current = command.execute(current, command.value);
                commands.push(command);
                log.add(action(command) + ": " + previous + " & " + command.value + " = " + current);
            },
            undo: function () {
                var command = commands.pop();
                var previous = current;
                current = command.undo(current, command.value);
                log.add("Undo " + action(command) + ": " + previous + " & " + command.value + " = " + current);
            }
        }
    };

    var calculator = new Calculator(new Manager());

    calculator.execute('add', 2);
    calculator.execute('sub', 20);
    calculator.execute('mul', 3);
    calculator.execute('mul', 5);
    calculator.undo();
    calculator.execute('div', 2);

    log.show()

})();

