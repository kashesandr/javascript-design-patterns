const log = require('../log')

class Module {
    log = null;

    i = 0;
    get () {
        this.log.add('Current value:' + this.i);
    }
    set (val) {
        this.i = val;
    }
    run () {
        this.log.add('The process started');
    }

    constructor(log) {
        this.log = log;
    }

    facade (args) {
        this.set(args.val);
        this.get();
        if (args.run) {
            this.run();
        }
    }
}

const run = () => {
    new Module(log).facade({run: true, val:10 });
}

run();

log.show()