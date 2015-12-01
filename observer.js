function extend( obj, extension ){
    for ( var key in extension )
        obj[key] = extension[key]
}

function Observer(){
    this.update = function(){};
}

var ObserverList = (function(){
    function ObserverList(){}
    ObserverList.prototype.observerList = [];
    ObserverList.prototype.add = function( obj ){
        return this.observerList.push( obj );
    };
    ObserverList.prototype.count = function(){
        return this.observerList.length;
    };
    ObserverList.prototype.get = function( index ){
        if( index > -1 && index < this.observerList.length )
            return this.observerList[ index ];
        return null;
    };
    ObserverList.prototype.indexOf = function( obj, startIndex ){
        var i = startIndex;
        while( i < this.observerList.length ){
            if( this.observerList[i] === obj ) return i;
            i++;
        }
        return -1;
    };
    ObserverList.prototype.removeAt = function( index ){
        this.observerList.splice( index, 1 );
    };
    return ObserverList;
})();

var Subject = ( function() {
    function Subject(){}
    Subject.prototype.observers = new ObserverList();
    Subject.prototype.addObserver = function( observer ){
        this.observers.add( observer );
    };
    Subject.prototype.removeObserver = function( observer ){
        this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
    };
    Subject.prototype.notify = function( context ){
        var observerCount = this.observers.count();
        for(var i=0; i < observerCount; i++){
            this.observers.get(i).update( context );
        }
    };
    return Subject;
} )();

var Person = (function(){
    var Person = function(name){
        this._name = name;
        this._greet = "Hi, I'm";
    };
    Person.prototype.say = function () {
        console.log(this._greet + " " + this._name);
    };
    return Person;
})();

var person = new Person('Alex');
extend(person, new Subject());

var person2 = new Person('Nick');
extend(person2, new Observer());
person2.update = function(txt){
    this._greet = txt;
};

var person3 = new Person('Dmitry');
extend(person3, new Observer());
person3.update = function(txt){
    this._greet = txt;
};

person.addObserver(person2);
person.addObserver(person3);

person2.say();
person3.say();

person.notify("Hi there, I'm");
person2.say();
person3.say();