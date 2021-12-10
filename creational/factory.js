const log = require('../log')

class Say {
    hourly = 0;
    sayRate() {
        return `rate $${this.hourly}/hour`;
    };
}

class Employee extends Say {
    type = '';
    sayType(){
        return `type ${this.type}`;
    }
}

class FullTime extends Employee {
    hourly = 12;
    type = 'fulltime';
}

class PartTime extends Employee {
    hourly = 11;
    type = 'parttime';
}

class Temporary extends Employee {
    hourly = 10;
    type = 'temporary';
}

class Contractor extends Employee {
    hourly = 15;
    type = 'contractor';
}

class Factory {

    createEmployee (type) {
        let employee;

        switch (type) {
            case "fulltime": {
                employee = new FullTime();
                break;
            }
            case "parttime": {
                employee = new PartTime();
                break;
            }
            case "temporary": {
                employee = new Temporary();
                break;
            }
            default: {
                employee = new Contractor();
                break;
            }
        }

        return employee;
    }

}

function run() {
    const factory = new Factory();

    [
        factory.createEmployee("fulltime"),
        factory.createEmployee("parttime"),
        factory.createEmployee("temporary"),
        factory.createEmployee("contractor")
    ].forEach( (employee) => {
        log.add(`${employee.sayType()}, ${employee.sayRate()}`)
    })

}

run();

log.show();