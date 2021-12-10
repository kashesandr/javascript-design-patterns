const log = require('../log');

class Singleton {
    static instance;

    static createInstance() {
        return new Object("I am the instance");
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = this.createInstance();
        }
        return this.instance;
    }
}

function run() {

    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();

    log.add("Same instance? " + (instance1 === instance2));
}

run();

log.show();