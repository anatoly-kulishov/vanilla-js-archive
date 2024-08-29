
/** **************************************************************************************************************** **/

// var f = function () {
//     this.x = 5;
//     (function () {
//         this.x = 3
//     })();
//     console.log('1:', this.x)
// }
//
// var obj = {
//     x: 4,
//     m: function () {
//         console.log('2:', this.x)
//     }
// }
//
// f();
// new f();
// obj.m();
// new obj.m();
// f.call(f);
// obj.m.call(f);

/** **************************************************************************************************************** **/

// let value = 100
//
// function worker() {
//     value = 10
//     return;
//     function value() {}
// }
//
// worker()
//
// console.log(value) //

/** **************************************************************************************************************** **/

import React from "react";
//
// const PleaseReviewMe = () => {
//     const [count, setCount] = React.useState(1);
//     const [items, setItems] = React.useState(() => [{id: 1}]);
//
//     React.useEffect(() => {
//         document.addEventListener("click", setInterval(() => console.log(count), 1000));
//     }, []);
//
//     const click = React.useCallback(() => {
//         setCount(count + 1);
//         setItems([...items, {id: count + 1}]);
//     }, [items, count])
//
//     return (
//         <React.Fragment>
//             <h2>Count: {count}</h2>
//             <ul>
//                 {items.map((item) => (
//                     <li>{item.id}</li>
//                 ))}
//             </ul>
//             <button onClick={() => click()}>add one</button>
//         </React.Fragment>
//     );
// };
//
// export default PleaseReviewMe;

/** **************************************************************************************************************** **/

// const operations = [
//     {date: "2019-07-31", amount: "5422"},
//     {date: "2017-06-30", amount: "5220"},
//     {date: "2017-05-31", amount: "5365"},
//     {date: "2017-08-31", amount: "5451"},
//     {date: "2017-09-30", amount: "5303"},
//     {date: "2018-03-31", amount: "5654"},
//     {date: "2017-10-31", amount: "5509"},
//     {date: "2017-12-31", amount: "5567"},
//     {date: "2018-01-31", amount: "5597"},
//     {date: "2017-11-30", amount: "5359"},
//     {date: "2018-02-28", amount: "5082"},
//     {date: "2018-04-14", amount: "2567"}
// ]
//
// const sortOperations = (operations) => {
//     // Code here...
// }
//
// console.log(sortOperations(operations))

/** **************************************************************************************************************** **/

// const a = 5
// const b = 10
//
// const func = (a,b) => {
//     return a + b
// }
//
// func(a,b)

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

////////////////////////////////////////////////////////////////////////////////////////////////////

// console.log("1");
// (async function () {
//   console.log("f1");
//   console.log(await "a1");
//   console.log("f2");
//   console.log(await a("a2"));
//   console.log("f3");
// })();
// console.log("2");

// // 1 f1 2 a1 f2 a2 f3

////////////////////////////////////////////////////////////////////////////////////////////////////

// const foo = async () => {
//   console.log("1");
//   return 100;
// };

// const bar = async () => {
//   console.log("2");
//   const r = await foo();
//   console.log(r);
//   foo().then((res) => console.log(res));
//   await console.log("3");
//   console.log(await "4");
// };

// bar();

////////////////////////////////////////////////////////////////////////////////////////////////////

// queueMicrotask(() => {
//   console.log("1");
// });

// Promise.reject("2")
//   .catch((res1) => {
//     console.log("res1", res1);
//     return "4";
//   })
//   .then((res2) => {
//     console.log("res2", res2);
//   }, );

// queueMicrotask(() => {
//   console.log("3");
// });

// 1 2 3 4

// ////////////////////////////////////////////////////////////////////////////////////////////////////


// function logger() {
//   console.log(`I output only external context: ${this.item}`);
// }

// const obj = { item: "some value" };
// const obj22 = { item: "some value 2" };
// const obj33 = { item: "some value 3" };

// // logger.bind(obj)();
// // logger.apply(obj);
// // logger.call(obj);
// logger.bind(obj).bind(obj22).call(obj33); // ()

////////////////////////////////////////////////////////////////////////////////////////////////////

// function makeCounter() {
//   let counter = 0; // 1
//   return function () {
//     return ++counter;
//   };
// }

// let someCounter = makeCounter();

// for (var i = 0; i < 10; i++) {
//   setTimeout(() => console.log(someCounter())); // 2...11
// }

// console.log(someCounter()); // 1

////////////////////////////////////////////////////////////////////////////////////////////////////

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   sayHelloRegular() {
//     console.log(`Привет, меня зовут ${this.name}`);
//   }

//   sayHelloArrow = () => {
//     console.log(`Привет, меня зовут ${this.name}`);
//   };
// }

// const person1 = new Person("Александр");
// const person2 = new Person("Екатерина");

// // const regularFunc = person1.sayHelloRegular.bind(person1);
// // regularFunc();

// // const arrowFunc = person2.sayHelloArrow;
// // arrowFunc();

////////////////////////////////////////////////////////////////////////////////////////////////////

// function fn() {
//     console.log('hello'); //
//
//     setTimeout(function () {
//         console.log('setTimeout1'); //
//     }, 0);
//
//     new Promise(function (resolve) {
//         resolve();
//         console.log('resolve') //
//     }).then(function () {
//         console.log('then1'); //
//     }).then(function () {
//         console.log('then2'); //
//     });
//
//     console.log('bye'); //
// }
//
// fn();