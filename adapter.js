function Shipping() {
    this.request = function(zipStart, zipEnd, weight) {
        // ...
        return "$49.75";
    }
}

function AdvancedShipping() {
    this.login = function(credentials) { /* ... */ };
    this.setStart = function(start) { /* ... */ };
    this.setDestination = function(destination) { /* ... */ };
    this.calculate = function(weight) { return "$39.50"; };
}

function ShippingAdapter(credentials) {
    var shipping = new AdvancedShipping();
    shipping.login(credentials);
    var adapt = function(zipStart, zipEnd, weight) {
        shipping.setStart(zipStart);
        shipping.setDestination(zipEnd);
        return shipping.calculate(weight);
    };
    return { request: adapt };
}

var shipping = new Shipping();
var advancedShipping = new ShippingAdapter({token: "30a8-6ee1"});

console.log(shipping.request("78701", "10010", "2 lbs"));
console.log(advancedShipping.request("78701", "10010", "2 lbs"));