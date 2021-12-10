const log = require('../log')

class Cache {
    cache = {};

    constructor(service) {

        // iterate over all methods, decorate & apply to the Cache instance
        Object
            .getOwnPropertyNames(Object.getPrototypeOf (service))
            .filter(name => (name !== 'constructor' && typeof service[name] === 'function'))
            .forEach( key => {
                const serviceMethod = service[key];
                const serviceMethodDecorated = (...args) => {
                    if (!this.cache[args.join(',')]) {
                        this.cache[args.join(',')] = serviceMethod.call(service, args);
                    }
                    return this.cache[args.join(',')];
                }
                this[key] = serviceMethodDecorated;
            });

    };
}

class Service {
    getRandom(x) {
        return Math.random() * x;
    }
}

const run = () => {
    const service = new Cache(new Service());

    log.add(service.getRandom(1));
    log.add(service.getRandom(1));
    log.add(service.getRandom(2));
}

run();

log.show()