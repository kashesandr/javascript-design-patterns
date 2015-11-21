// old interface

function Shipping() {
    this.request = function(zipStart, zipEnd, weight) {
        // ...
        return "$49.75";
    }
}

// new interface

function AdvancedShipping() {
    this.login = function(credentials) { /* ... */ };
    this.setStart = function(start) { /* ... */ };
    this.setDestination = function(destination) { /* ... */ };
    this.calculate = function(weight) { return "$39.50"; };
}

// adapter interface

function ShippingAdapter(credentials) {

    var shipping = new AdvancedShipping();
    shipping.login(credentials);

    var adapt = function(zipStart, zipEnd, weight) {
        shipping.setStart(zipStart);
        shipping.setDestination(zipEnd);
        return shipping.calculate(weight);
    };

    return {
        request: adapt
    };
}

// log helper

var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {
    var oldShipping = new Shipping();
    var credentials = {token: "30a8-6ee1"};
    var newShipping = new ShippingAdapter(credentials);

    // original shipping object and interface

    log.add( "Old cost: " + oldShipping.request("78701", "10010", "2 lbs") );

    // new shipping object with adapted interface

    log.add( "New cost: " + newShipping.request("78701", "10010", "2 lbs") );

    log.show();
}

run();