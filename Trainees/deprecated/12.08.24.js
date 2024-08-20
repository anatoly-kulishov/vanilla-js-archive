// async function a(p) {
//   return p;
// }

// console.log("1");
// (async function () {
//   console.log("f1");
//   console.log(await "a1");
//   console.log("f2");
//   console.log(await a("a2"));
//   console.log("f3");
// })();
// console.log("2");

// 1 f1 2 a1 f2 a2 f3
/** ************************************************************************ */
// const foo = async () => {
//   console.log("1");
//   return 100;
// };
//
// const bar = async () => {
//   console.log("2");
//   const r = await foo();
//   console.log(r);
//   foo().then((res) => console.log(res));
//   await console.log("3");
//   console.log(await "4");
// };
//
// bar();
/** ************************************************************************ */
// queueMicrotask(() => {
//   console.log("1");
// });
//
// Promise.reject("2")
//   .catch((res1) => {
//     console.log("res1", res1);
//     return "4";
//   })
//   .then((res2) => {
//     console.log("res2", res2);
//   }, );
//
// queueMicrotask(() => {
//   console.log("3");
// });
/** ************************************************************************ */
// function logger() {
//   console.log(`I output only external context: ${this.item}`);
// }
//
// const obj = { item: "some value" };
// const obj22 = { item: "some value 2" };
// const obj33 = { item: "some value 3" };
//
// logger.bind(obj)();
// logger.apply(obj);
// logger.call(obj);
// logger.bind(obj).bind(obj22).call(obj33); // ()
/** ************************************************************************ */
// function makeCounter() {
//   let count = 0;
//   return () => ++count;
// }
//
// let someCounter = makeCounter();
//
// for (var i = 0; i < 10; i++) {
//   setTimeout(() => console.log(someCounter())); // 2...11
// }
//
// console.log(someCounter()); // 1
/** ************************************************************************ */
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//
//   sayHelloRegular() {
//     console.log(`Привет, меня зовут ${this.name}`);
//   }
//
//   sayHelloArrow = () => {
//     console.log(`Привет, меня зовут ${this.name}`);
//   };
// }
//
// const person1 = new Person("Александр");
// const person2 = new Person("Екатерина");
//
// const regularFunc = person1.sayHelloRegular.bind(person1);
// regularFunc(); //
//
// const arrowFunc = person2.sayHelloArrow;
// arrowFunc(); //

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
/** ************************************************************************ */
/** ************************************************************************ */
/** ************************************************************************ */
/** ************************************************************************ */
/**
 Вывести значения полей в консоль, при клике на форму,
 учитывая что первый input controlled, а второй input uncontrolled.
 */
// import React from "react";
//
// export default () => {
//   return (
//     <form onClick={onClickForm}>
//       <input placeholder="controlled" />
//       <input placeholder="uncontrolled" />
//       <button>Отправить заявку на кредит</button>
//     </form>
//   );
// };
/** ************************************************************************ */
// import heavyComputations from './util'
//
// const [data, setData] = useState(heavyComputations(props.basedOn)) // heavy computation

// useMemo для 2-й загрузки и последующих
// Асинхронные вычисления с помощью useEffect
// web-worker
// lazy Suspense
// React.memo
// virtualization(IntersectionObserver), pagination
// деление на чанки метода (Promise, setTimeout) основной способ
// Предварительная обработка данных на сервере
/** ************************************************************************ */
// O(log n)
// function isPalindrome(str) {
//   // Code here...
// }
//
// console.log(isPalindrome("radar")); // true (палиндром)
// console.log(isPalindrome("hello")); // false (не палиндром)
// console.log(isPalindrome("level")); // true (палиндром)

// return str === str.split('').reverse().join(''); // O(3*n) = O(n)
/** ************************************************************************ */
// let x = {a: 1, b: 2};
//
// function fn1(x) {
//  x.a = 5;
// }
//
// function fn2() {
//  x.a = 4;
// }
//
// function fn3(x) {
//  x = 5;
// }
//
// function fn4() {
//  x = 5;
// }
//
//
// fn1(x);
// console.log(x); // ?
//
// fn2(x);
// console.log(x); // ?
//
// fn3(x);
// console.log(x); // ?
//
// fn4(x);
// console.log(x); // ?
/** ************************************************************************ */
// function fn() {
//  console.log('hello'); //
//
//  setTimeout(function () {
//   console.log('setTimeout1'); //
//  }, 0);
//
//  new Promise(function (resolve) {
//   resolve();
//   console.log('resolve') //
//  }).then(function () {
//   console.log('then1'); //
//  }).then(function () {
//   console.log('then2'); //
//  });
//
//  console.log('bye'); //
// }
//
// fn();
/** ************************************************************************ */
// Функция которая ищет в массиве 2 числа , которые будут равны сумме.

// function func(arr, total) {
//  // Code here...
// }
//
// let arr = [1, 3, 5, 10, 24, 32];
// let total = 35
//
// console.log(func(arr, total)) // [32, 3]
/** ************************************************************************ */
// const luckyNumber = (arr, luckyNumber) => {
//  // Code here...
// }
//
// console.log(luckyNumber([1, 2, 3, 22, 2, 3, 2, 69, 5], 7)); // true
// console.log(luckyNumber([1, 10, 17, 3, 3, 1], 7)); // true
// console.log(luckyNumber([1, 2, 3], 6), true); // true
// console.log(luckyNumber([1, 2, 3], 7), false); // false
// console.log(luckyNumber([7], 7), false); // false
// console.log(luckyNumber([]), false); // false
/** ************************************************************************ */
// const sumArray = (arr) => {
//  // Code here...
// }
//
// console.log(sumArray([[25, 25], [5, 5, 9]])); // 69
// console.log(sumArray([[1, 1], [2], [3]])); // 7
// console.log(sumArray([[1], [1], []])); // 2
/** ************************************************************************ */
