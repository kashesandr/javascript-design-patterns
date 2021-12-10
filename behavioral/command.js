const log = require('../log');

class Command {
    execute = () => {};
    undo = () => {};
    value = null;
    constructor(value) {
        this.value = value;
    }
}

const add = (x, y) => { return x + y; }
const sub = (x, y) => { return x - y; }
const mul = (x, y) => { return x * y; }
const div = (x, y) => { return x / y; }

class Add extends Command {
    execute = add;
    undo = sub;
}
class Sub extends Command {
    execute = sub;
    undo = add;
}
class Mul extends Command {
    execute = mul;
    undo = div;
}
class Div extends Command {
    execute = div;
    undo = mul;
}

class Calculator {
    current = 0;
    commands = [];
    actionName = (command) => {
        const name = command.execute.toString();
        return name.charAt(0).toUpperCase() + name.slice(1);
    };
    logger = null;

    constructor(logger) {
        this.logger = logger
    }

    exec(Cmd, ...args) {
        const cmd = new Cmd(...args)
        const previous = this.current;
        this.current = cmd.execute(this.current, cmd.value);
        this.commands.push(cmd);
        this.logger.add(this.actionName(cmd) + ": " + previous + " & " + cmd.value + " = " + this.current);
    }

    undo () {
        const command = this.commands.pop();
        const previous = this.current;
        this.current = command.undo(this.current, command.value);
        this.logger.add("Undo " + this.actionName(command) + ": " + previous + " & " + command.value + " = " + this.current);
    }
}

const run = () => {
    const calculator = new Calculator(log);

    calculator.exec(Add, 2);
    calculator.exec(Sub, 20);
    calculator.exec(Mul, 3);
    calculator.exec(Mul, 5);
    calculator.undo();
    calculator.exec(Div, 2); // -27

    log.show()
}

run();

log.show();