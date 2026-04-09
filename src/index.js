var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.greet = function () {
        return "Hello, ".concat(this.name);
    };
    return Person;
}());
var p = new Person("Jan");
console.log(p.greet());
