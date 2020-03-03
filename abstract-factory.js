function CarFactory() {}
CarFactory.prototype.createCar = function (model) {
    var car;
    switch(model) {
        case 'Cayman':
            car = new Cayman();
            break;
        case 'Boxster':
            car = new Boxster();
            break;
        default:
            car = new Cayman();
            break;
    }
    if (typeof car.printModel === 'undefined') {
        car.printModel = function () {
            console.log('This car model is:', car.model);
        }
    }
    return car;
};

function Cayman() { this.model = 'Cayman'; }
Cayman.prototype.createDoor = function (side) { return CaymanDoor(side); };
Cayman.prototype.createHood = function () { return CaymanHood(); };
function CaymanDoor(side) {
    return {
        build: function() { console.log(`Build a ${side} door for Cayman`); }
    }
}
function CaymanHood() {
    return {
        build: function() { console.log(`Build a hood for Cayman`); }
    }
}

function Boxster() { this.model = 'Boxster'; }
Boxster.prototype.createDoor = function (side) { return BoxsterDoor(side); };
Boxster.prototype.createHood = function () { return BoxsterHood(); };
function BoxsterDoor(side) {
    return {
        build: function() { console.log(`Build a ${side} door for Boxster`); }
    }
}
function BoxsterHood() {
    return {
        build: function() { console.log(`Build a hood for Boxster`); }
    }
}

var carFactory = new CarFactory();

var boxsterCar = carFactory.createCar('Boxster');

boxsterCar.printModel();
boxsterCar.createDoor('right').build();
boxsterCar.createDoor('left').build();
boxsterCar.createHood().build();