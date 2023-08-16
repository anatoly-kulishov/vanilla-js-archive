/** Output: [wrapper: 3, showValue: 2] */
// let value = 2;
//
// function showValue() {
//   console.log(`showValue ${value}`); //
// }
//
// function wrapper() {
//   let value = 3;
//   console.log(`wrapper ${value}`); //
//   showValue();
// }
//
// wrapper();
/** **************************************************** */
/** Output: [undefined] */
// let foo = 1;
//
// (function f() {
//
//   if (foo) {
//     var foo = 2;
//   }
//
//   console.log(foo);
// })();
/** **************************************************** */
/** Output: [this: {}, foo.this: global, foo2.this: undefined] */
// console.log(this); //
//
// function foo() {
//   console.log(this); //
// }
//
// function foo2() {
//   "use strict";
//   console.log(this); //
// }
//
// foo();
//
// foo2();
/** **************************************************** */
/** Output: [square.area: 25, square.perimeter: NaN] */
// const square = {
//   side: 5,
//   area() {
//     return this.side * this.side;
//   },
//   perimeter: () => 4 * this.side
// };
//
// console.log(square.area()); //
// console.log(square.perimeter()); //
/** **************************************************** */
/** Output: [foo.this: global] */
// function foo() {
//   console.log(this);
// }
//
// function doFo(fn) {
//   fn();
// }
//
// var a = { foo: foo };
//
// doFo(a.foo);
/** **************************************************** */
/** Output: [1: "Чек от месье Ivan", 2: Error (is non a function)] */
// class Customer {
//   constructor(name) {
//     this.name = name;
//   }
// }
//
// Customer.prototype.pay = function() {
//   console.log(`Чек от месье ${this.name}`);
// };
//
// const Ivan = new Customer("Ivan");
//
// Ivan.pay();
//
// delete Customer.prototype.pay;
//
// Ivan.pay();
/** **************************************************** */
/** Output: [1, 5, 3, 4, 2] */
// setTimeout(() => console.log(2), 0);
//
// console.log(1);
//
// new Promise(res => {
//   console.log(5);
//   res();
// }).then(() => console.log(4));
//
// console.log(3);
/** **************************************************** */
/** Output: [2, 1] */
// Promise.resolve(1)
//   .then(x => x + 1)
//   .then(x => {throw x;})
//   .then(x => console.log(x))
//   .catch(err => console.log(err))
//   .then(() => Promise.resolve(1))
//   .catch(err => console.log(err))
//   .then(x => console.log(x));
/** **************************************************** */
/**
 * Написать функцию с типизацией, которая принимает массив (скорее всего чисел) и асинхронный колбэк,
 * проверяет все элементы массива колбэком и возвращает массив удовлетворяющих этому результатов
 */
// const asyncFilter = async (arr, predicate) => {
//   const result = await Promise.all(arr.map((item) => predicate(item)));
//
//   return arr.filter((item, index) => result[index]);
// };
//
// const NUMBERS = [1, 2, 3, 4, 5];
//
// const isEven = async (number) => {
//   return number % 2 === 0;
// };
//
// async function runAsyncFilter() {
//   const evenNumbers = await asyncFilter(NUMBERS, isEven);
//
//   console.log(evenNumbers); // 2, 4
// }
//
// runAsyncFilter();
