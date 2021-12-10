var PubSub = function() {
    this.idCounter = 0;
    this.ps = {};
};

PubSub.prototype.subscribe = function(topic, fn) {
    if (!(topic in this.ps)) { this.ps[topic] = []; }
    this.ps[topic].push({
        id: ++this.idCounter,
        callback: fn
    });
    return this.idCounter;
};
PubSub.prototype.unsubscribe = function(topic, id) {
    var subscribers = [];
    for (var subscriber of this.ps[topic]) {
        if (subscriber.id !== id) {
            subscribers.push(subscriber);
        }
    }
    this.ps[topic] = subscribers;
};
PubSub.prototype.publish = function(topic, data) {
    for (var subscriber of this.ps[topic]) {
        subscriber.callback(data);
    }
};

console.log('--- pubSub 1 --- ');
var pubSub = new PubSub();
pubSub.subscribe("event 1", function(data) { console.log("event 1 fired" + JSON.stringify(data)); });
pubSub.subscribe("event 2", function(data) { console.log("event 2 fired" + JSON.stringify(data)); });
var id3 = pubSub.subscribe("event 1", function(data) {console.log("event 3 fired" + JSON.stringify(data)); });
pubSub.publish("event 1", {"data": "data1"});
pubSub.publish("event 2", {"data": "data2"});
pubSub.unsubscribe("event 1", id3);
pubSub.publish("event 1", {"data": "data1"});
pubSub.publish("event 2", {"data": "data2"});

console.log('--- pubSub 2 ---');
var pubSub2 = new PubSub();
pubSub2.subscribe("event 1", function(data) { console.log("event 1 fired" + JSON.stringify(data)); });
pubSub2.subscribe("event 2", function(data) { console.log("event 2 fired" + JSON.stringify(data)); });
id3 = pubSub2.subscribe("event 1", function(data) {console.log("event 3 fired" + JSON.stringify(data)); });
pubSub2.publish("event 1", {"data": "data1"});
pubSub2.publish("event 2", {"data": "data2"});
pubSub2.unsubscribe("event 1", id3);
pubSub2.publish("event 1", {"data": "data1"});
pubSub2.publish("event 2", {"data": "data2"});