var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PersonAbstract = /** @class */ (function () {
    function PersonAbstract(name) {
        this.name = name;
    }
    return PersonAbstract;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name) {
        var _this = _super.call(this, name) || this;
        _this.age;
        return _this;
    }
    Person.prototype.setAge = function (age) {
        this.age = age;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.getFullInfo = function () {
        return {
            name: this.name,
            age: this.age
        };
    };
    return Person;
}(PersonAbstract));
var Anatoly = new Person('Anatoly');
Anatoly.setAge(22);
console.log(Anatoly.getAge());
Anatoly.setAge(23);
console.log(Anatoly.getFullInfo());
