// console.log("start");
//
// async function foo() {
//   console.log("1");
//   await console.log("2");
//   console.log("3");
// }
//
// foo();
//
// console.log("end");

// Output: start, 1, 2, end, 3
/** ************************************************************************ */
// function a() {
//   console.log("1");
//   Promise.resolve().then(a);
// }
//
// function b() {
//   console.log("2");
//   setTimeout(b);
// }
//
// a();
// b();
// Output: 1, 2, 1...
/** ************************************************************************ */
// console.log(1);
//
// const p = Promise.resolve(() => {
//   console.log(2);
//
//   setTimeout(() => console.log(3));
// });
//
// let z = new Promise(() => console.log(6));
//
// setTimeout(() => console.log(4));
//
// p.then((res) => {
//   res();
//   console.log("name");
// });
//
// console.log(5);
// Output: 1, 6, 5, 2, name, 4, 3
/** ************************************************************************ */
// Promise.reject("a") // a
//   .then(p => p + "1", p => p + "2") // a2
//   .catch(p => p + "b") //
//   .catch(p => p + "с") //
//   .then(p => p + "d1") // a2d1
//   .then("d2") //
//   .then(p => p + "d3") // a2d1d3
//   .finally(p => p + "e") // undefined + e
//   .then(p => console.log(p)); // a2d1d3
/** ************************************************************************ */
// let foo = {
//   bar: 1,
// }
//
// const baz = foo;
//
// foo.bar = 2
//
// foo = {
//   bar: 3
// }
//
// console.log (baz.bar); // 2
/** ************************************************************************ */
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//
//   getName() {
//     console.log(this.name);
//   }
//
//   static Hello() {
//     console.log("Hello");
//   }
// }
//
// class Cat extends Animal {
//   constructor(name, age) {
//     super(name);
//     this.age = age;
//   }
//
//   getName() {
//     console.log(`${this.name} ${this.age}`);
//   }
// }
//
// let animal = new Animal("Petya");
// animal.getName(); // Petya
// Animal.Hello(); // Hello
//
// let cat = new Cat("Vasya", 28);
// cat.getName(); // Vasya 28
/** ************************************************************************ */
// let a = {
//   foo: function() {
//     console.log(this)
//   },
//   bar: () => {
//     console.log(this);
//   }
// }
//
// a.foo(); // a
// a.bar(); // window
//
// let c = a.foo;
//
// c(); // window
//
// const fn = (cb) => cb()
// fn(a.foo); // window
/** ************************************************************************ */
// console.log(x); // undefined
//
// var x = 1;
//
// console.log(x); // 1
//
// function car() {
//   // x = undefined;
//   if (false) {
//     var x = 2;
//   }
//   console.log(x); // undefined
// }
//
// car();
// console.log(x); // 1
/** ************************************************************************ */
// let x = 2;
//
// const foo = () => {
//   console.log(x); // error ~ 2
// };
//
// const bar = () => {
//   console.log(x); // error
//   let x = 1;
//   foo();
// };
//
// bar();
/** ************************************************************************ */
// lex. env: {
//   env record: {inner variable, this}
//   outer: link on outer lex. env
// }
/** ************************************************************************ */
// var i = 1;
// var b = {};
//
// (function() {
//   i++;
//   b.j = 1;
// })();
//
// console.log(i, b); // 2 {j: 1}
//
// (function(i, b) {
//   i++;
//   b.k = 1;
//   console.log(i); // 3
// })(i, b);
//
// console.log(i, b); // 2 {j: 1, k: 1}
/** ************************************************************************ */
// var a = {};
//
// function clear(a) {
//   a.b = 2;
//   a = null;
//
//   console.log(a); // null
// }
//
// clear(a);
//
// console.log(a); // { b: 2 }
// console.log(a.b); // 2
