
var User = (function () {

    function User(name, age) {
        this.name = name;
        this.age = age;
    }

    User.prototype.saveState = function () {
        return new Memento(this);
    };

    User.prototype.set = function (key, value) {
        this[key] = value;
    };

    User.prototype.restoreState = function (memento) {
        if (memento === undefined) 
            throw new Error('State is not found!');
        var state = JSON.parse(memento.getState());
        this.name = state.name;
        this.age = state.age;
    };

    return User;
})();

var Memento = (function () {

    function Memento(state) {
        this.jsonState = JSON.stringify(state);
    }

    Memento.prototype.getState = function () {
        return this.jsonState;
    };

    return Memento;
})();

var StateManager = (function (){

    function StateManager() {
        this.mementos = [];
    }

    StateManager.prototype.set = function(memento) {
        this.mementos.push(memento);
    };

    StateManager.prototype.get = function(index) {
        var ind = parseInt(index, 10);
        return this.mementos[isNaN(ind) ? this.mementos.length - 1 : ind];
    };

    StateManager.prototype.clean = function () {
        this.mementos = [];
    };

    return StateManager;
})();

function run(){
    var stateManager = new StateManager();

    var user = new User('Alex', 26);
    stateManager.set( user.saveState() );

    user.set('name', 'Mike');
    stateManager.set( user.saveState() );

    user.restoreState(stateManager.get(0));
    console.log(user.name, user.age);
    user.restoreState(stateManager.get(1));
    console.log(user.name, user.age);
}

run();
