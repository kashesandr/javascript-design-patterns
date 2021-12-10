const log = require('../log')

function Task (name) {
    this.name = name;
    this.completed = false;
    this.complete = () => {
        log.add(`Completing ${this.name}`)
        this.completed = true;
    }
    this.save = () => {
        log.add(`Saving ${this.name}`)
    }
}

const run = () => {
    ['a','b','c','d'].forEach( item => {
        const instance = new Task(item);
        instance.complete();
        instance.save();
    })
}

run();

log.show();
