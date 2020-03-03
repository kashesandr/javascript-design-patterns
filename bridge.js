// input devices
var Gestures = function (output) {
    this.output = output;

    this.tap    = function () { this.output.click(); };
    this.swipe  = function () { this.output.move(); };
    this.pan    = function () { this.output.drag(); };
    this.pinch  = function () { this.output.zoom(); };
};
var Mouse = function (output) {
    this.output = output;

    this.click  = function () { this.output.click(); };
    this.move   = function () { this.output.move(); };
    this.down   = function () { this.output.drag(); };
    this.wheel  = function () { this.output.zoom(); };
};

// output devices
var Screen = function () {
    this.click  = function () { console.log("Screen click"); };
    this.move   = function () { console.log("Screen move"); };
    this.drag   = function () { console.log("Screen drag"); };
    this.zoom   = function () { console.log("Screen zoom"); };
};
var Audio = function () {
    this.click  = function () { console.log("Sound oink"); };
    this.move   = function () { console.log("Sound waves"); };
    this.drag   = function () { console.log("Sound screetch"); };
    this.zoom   = function () { console.log("Sound volume up"); };
};

var gestures = new Gestures(new Screen());
var mouse = new Mouse(new Audio());

gestures.tap();
gestures.swipe();
gestures.pinch();
gestures.pan();

console.log('--- --- ---');

mouse.click();
mouse.move();
mouse.wheel();
mouse.down();