/**
 * В данном примере у объекта obj1 есть метод doSomething, который вызывает метод doSomethingElse у объекта obj2.
 * При вызове метода doSomething в контексте объекта obj1,
 * this ссылается на объект obj1, и в консоль будет выведено "Object 1".
 *
 * Однако, когда метод doSomethingElse вызывается внутри метода doSomething,
 * он имеет неявную привязку this к объекту obj2, и в консоль будет выведено "Object 2".
 *
 * Таким образом, неявная привязка this позволяет вызывать методы из разных объектов и использовать их вместе,
 * но требует внимательности при написании кода, чтобы избежать неожиданного поведения.
 */

let obj1 = {
    name: "Object 1",
    doSomething: function () {
        console.log(this.name);
        obj2.doSomethingElse();
    }
};

let obj2 = {
    name: "Object 2",
    doSomethingElse: function () {
        console.log(this.name);
    }
};

obj1.doSomething(); // Result: ? ?
