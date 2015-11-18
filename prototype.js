var CommonObject = function() {

    this.aFunction = function someFunction() {
        console.log( 'a function' );
    };

    this.anotherFunction = function someOtherFunction() {
        console.log( 'another function' );
    };

    this.getName = function showMyName() {
        return this.name;
    };

};

function MyObject() {
    this.name = 'testing';
}
MyObject.prototype = new CommonObject();

// usage
var testObject = new MyObject();
testObject.aFunction();
testObject.anotherFunction();
console.log(testObject.getName());