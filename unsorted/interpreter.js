(function(){

    var Parser = (function(){
        var _currentIndex = 0, _list = [],
            _pattern = null, _ResultObj = null;
        var Parser = function(str, pattern, ResultObject){
            _pattern = pattern;
            _ResultObj = ResultObject;
            _list = str.split("\n");
        };
        Parser.prototype.nextItem = function () {
            if (!_list[_currentIndex]) return null;
            var segments = _list[_currentIndex++].match(_pattern);
            return new (
                Function.prototype.bind.apply(
                    _ResultObj,
                    [null].concat(segments.slice(1))
                )
            );
        };
        return Parser;
    })();

    var string = "hello world,hello world 2\n";
    string += "123,456";
    var pattern = /(.*),(.*)/;
    var Obj = function(a,b) {
            return {
                "var1": a,
                "var2": b
            }
        };

    var parser = new Parser(string, pattern, Obj);

    console.log(parser.nextItem());
    console.log(parser.nextItem());

})();