const log = require('../log')

class CommonObject {
    log = null;
    name = null;

    constructor(log) {
        this.log = log
    }

    aFunction () {
        log.add( 'a function' );
    };

    anotherFunction () {
        log.add( 'another function' );
    };

    getName () {
        return this.name;
    };

}

function MyObject() {
    this.name = 'test name';
}
MyObject.prototype = new CommonObject();

const run = () => {
    const testObject = new MyObject();
    testObject.aFunction();
    testObject.anotherFunction();
    log.add(testObject.getName());
}

run();

log.show();

