var Iterator = function(items) {
    var _index = 0,
        _items = items;
    return {
        first: function() {
            this.reset();
            return this.next();
        },
        next: function() {
            return _items[_index++];
        },
        hasNext: function() {
            return _index <= _items.length;
        },
        reset: function() {
            _index = 0;
        },
        each: function(callback) {
            for (var item = this.first(); this.hasNext(); item = this.next()) {
                callback(item);
            }
        }
    }
};

var log = (function() {
    var log = "";
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

function run() {
    var items = ["foo", 0, "bar", false, (new Date()).toString()];
    var iter = new Iterator(items);

    for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
        log.add(item);
    }
    log.add("");

    iter.each(function(item) {
        log.add(item);
    });

    log.show();
}

run();