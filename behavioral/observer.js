const log = require('../log')

class ObserverList {
    observerList = [];
    add ( obj ){
        return this.observerList.push( obj );
    };
    count (){
        return this.observerList.length;
    };
    get( index ){
        if( index > -1 && index < this.observerList.length )
            return this.observerList[ index ];
        return null;
    };
    indexOf ( obj, startIndex ){
        let i = startIndex;
        while( i < this.observerList.length ){
            if( this.observerList[i] === obj ) return i;
            i++;
        }
        return -1;
    };
    removeAt( index ){
        this.observerList.splice( index, 1 );
    };
}

class SubjectObserver {

    // subject part
    observers = new ObserverList();
    addObserver ( observer ){
        this.observers.add( observer );
    }
    removeObserver ( observer ){
        this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
    }
    notify ( context ){
        const observerCount = this.observers.count();
        for(let i = 0; i < observerCount; i++){
            this.observers.get(i).update( context );
        }
    }

    // observer part
    update() {}
}

class Person extends SubjectObserver{
    log = null;
    constructor(name, log){
        super()
        this._name = name;
        this._greet = "Hi, I'm";
        this.log = log;
    };
    say() {
        this.log.add(this._greet + " " + this._name);
    };
}

const run = () => {

    const person = new Person('Alex', log);

    const person2 = new Person('Nick', log)
    person2.update = function(txt){
        this._greet = txt;
    }

    const person3 = new Person('Dmitry', log);
    person3.update = function(txt){
        this._greet = txt;
    }

    person.say();
    person2.say();
    person3.say();

    person.addObserver(person2);
    person.addObserver(person3);
    person.notify("Hi there, I'm");

    person.say();
    person2.say();
    person3.say();

}

run();

log.show();