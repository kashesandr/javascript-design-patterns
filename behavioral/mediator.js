const log = require('../log');

class Mediator {
    channels = {};
    emit (channel) {
        if (!this.channels[channel]) return false;
        let subscription = null;
        const args = Array.prototype.slice.call(arguments, 1);
        for (let i = 0, l = this.channels[channel].length; i < l; i++) {
            subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    }
    on (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({ context: this, callback: fn });
        return this;
    }
}

class Person extends Mediator {
    name = 'sam'
}

const run = () => {
    const obj = new Person();
    const eventName = 'nameChange';
    obj.on(eventName, function(arg) {
        const oldname = this.name;
        this.name = arg;
        log.add(oldname+" changed to "+this.name);
    });
    obj.emit(eventName, 'john');
    obj.emit(eventName, 'sam');
}


run();

log.show();