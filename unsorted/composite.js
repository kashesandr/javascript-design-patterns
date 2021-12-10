/**
 *
 * @param name
 * @constructor
 */
var Component = function(name) {

    this.children = [];
    this.name = name;
    this.attributes = {};

};

/**
 *
 * @type {{addLine: Function, remove: Function, getChildByIndex: Function, hasChildren: Function}}
 */
Component.prototype = {

    add: function (child) {
        this.children.push(child);
    },

    remove: function (child) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },

    getChildByIndex: function (i) {
        return this.children[i];
    },

    /**
     * set value to key to the component and all children
     * @param key
     * @param value
     */
    setAttribute: function (key, value) {
        var child;

        for (var i = 0; child = this.getChildByIndex(i); i++) {
            child.setAttribute(key, value);
        }

        this.attributes[key] = value;
    }

};


/**
 * logging helper
 * @type {{addLine, show, traverse}}
 */
var log = (function () {
    var str = "";
    var api = {
        addLine: function (msg) {
            str += msg + "\n";
            return this;
        },
        show: function () {
            console.log(str);
            str = "";
        },
        traverse: function traverse(indent, component) {
            var str = '';
            str += Array(indent++).join("--");
            str += component.name;

            if (Object.keys(component.attributes).length > 0)
                str += ' ' + JSON.stringify(component.attributes);

            api.addLine(str);
            for (var i = 0, len = component.children.length; i < len; i++) {
                traverse(indent, component.getChildByIndex(i));
            }
            return this;
        }
    };
    return api;
})();

/**
 * run
 */
function run() {

    var one = new Component("one");
    var two = new Component("two");
    var three = new Component("three");
    var four = new Component("four");
    var five = new Component("five");
    var six = new Component("six");

    one.add(two);
    one.add(three);
    one.remove(three);  // note: remove
    one.add(three);

    two.add(four);
    two.add(five);
    two.setAttribute('attribute', true);

    three.add(six);

    log.traverse(1, one);
    log.show();
}

run();