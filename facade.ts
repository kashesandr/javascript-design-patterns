var module = (function() {
    var _private = {
        i: 5,
        get: function() {
            console.log('Current value:' + this.i);
        },
        set: function(val) {
            this.i = val;
        },
        run: function() {
            console.log('The process started');
        }
    };
    return {
        facade: function(args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        }
    }
}());

module.facade({run:true, val:10});