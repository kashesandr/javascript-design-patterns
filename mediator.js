var mediator = (function() {
    var subscribe = function(channel, fn) {
            if (!mediator.channels[channel]) mediator.channels[channel] = [];
            mediator.channels[channel].push({ context: this, callback: fn });
            return this;
        },

        publish = function(channel) {
            if (!mediator.channels[channel]) return false;
            var subscription = null;
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
                subscription = mediator.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }
            return this;
        };

    return {
        channels: {},
        emit: publish,
        on: subscribe,
        installTo: function(obj) {
            obj.on = subscribe;
            obj.emit = publish;
        }
    };

}());


var obj = {name: 'sam'};
mediator.installTo(obj);

obj.on('nameChange', function(arg) {
    var oldname = this.name;
    this.name = arg;
    console.log(oldname+" changed to "+this.name);
});
obj.emit('nameChange', 'john'); //sam, john