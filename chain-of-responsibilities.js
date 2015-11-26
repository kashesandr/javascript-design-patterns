var List = (function () {
    function List() {
        this._todos = {};
    }
    List.prototype.add = function (_, __) {
        if (this._todos[_] === undefined) {
            this._todos[_] = __;
        }
        return this;
    };
    List.prototype.get = function (_) {
        return this._todos[_] || null;
    };
    List.prototype.remove = function (_) {
        delete this._todos[_];
        return this;
    };
    List.prototype.edit = function (_, __) {
        if (this._todos[_] !== undefined) {
            this._todos[_] = __;
        }
        return this;
    };
    List.prototype.clean = function () {
        this._todos = {};
        return this;
    };
    return List;
})();

list = new List();
list.add('item','value').add('item2','value2').remove('item');

console.log(list.get('item'));
console.log(list.get('item2'));
console.log(list.clean().get('item2'));