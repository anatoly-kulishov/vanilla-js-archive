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
/** ************************************************************************ */
// Promise.reject("a") //
//   .then(p => p + "1", p => p + "2") //
//   .catch(p => p + "b") //
//   .catch(p => p + "с") //
//   .then(p => p + "d1") //
//   .then("d2") //
//   .then(p => p + "d3") //
//   .finally(p => p + "e") //
//   .then(p => console.log(p)); //
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
// console.log (baz.bar); //
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
// animal.getName(); //
// Animal.Hello(); //
//
// let cat = new Cat("Vasya", 28);
// cat.getName(); //
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
// a.foo(); //
// a.bar(); //
//
// let c = a.foo;
//
// c(); //
//
// const fn = (cb) => cb()
// fn(a.foo); //
/** ************************************************************************ */
// console.log(x); //
//
// var x = 1;
//
// console.log(x); //
//
// function car() {
//   // x = undefined;
//   if (false) {
//     var x = 2;
//   }
//   console.log(x); //
// }
//
// car();
// console.log(x); //
/** ************************************************************************ */
// let x = 2;
//
// const foo = () => {
//   console.log(x); //
// };
//
// const bar = () => {
//   console.log(x); //
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
// console.log(i, b); //
//
// (function(i, b) {
//   i++;
//   b.k = 1;
//   console.log(i); //
// })(i, b);
//
// console.log(i, b); //
/** ************************************************************************ */
// var a = {};
//
// function clear(a) {
//   a.b = 2;
//   a = null;
//
//   console.log(a); //
// }
//
// clear(a);
//
// console.log(a); //
// console.log(a.b); //
