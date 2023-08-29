/** Output: [no] */
// var val = (function(a) {
//   a = "maybe";
//   arguments[0] = "no";
//   return a;
// })("yes");
//
// console.log(val); // ?
/** **************************************************** */
/** Output: [Pikachu] */
// var poke1 = { name: "Pikachu" };
// var poke2 = { name: "Chermander" };
// var poke3 = { name: "Bulbasaur" };
//
// var sayName = function() {
//   console.log(this.name);
// };
//
// sayName.bind(poke1).bind(poke2).call(poke3);
/** **************************************************** */
/** Output: [undefined] */
// function hoist() {
//   var message;
//   console.log(message);
//   message = "Hoisting is all the rage!";
// }
//
// hoist();
/** **************************************************** */
/** Output: [1: string, 5: number 3: string] */
// class MyClass {
//   b = 5;
//
//   constructor(a, b) {
//     this.a = a;
//   }
// }
//
// class Class extends MyClass {
//   constructor(a, b, c) {
//     super(a, b);
//     this.c = c;
//   }
//
//   logABC() {
//     console.log(typeof this.a); //
//     console.log(typeof this.b); //
//     console.log(typeof this.c); //
//   }
// }
//
// const o = new Class("1", "2", "3");
// o.logABC();
/** **************************************************** */
/** Output: [true, null, undefined] */
// Какие значения будут выводиться в коде ниже?
// var animal = { jumps: null };
// var rabbit = { jumps: true };
//
// rabbit.__proto__ = animal;
//
// console.log( rabbit.jumps ); // ?
//
// delete rabbit.jumps;
// console.log( rabbit.jumps ); // ?
//
// delete animal.jumps;
// console.log( rabbit.jumps);  // ?
/** **************************************************** */
/** Output: [1, 1, undefined] */
// var a = { b: 1 };
// var c = Object.create(a);
//
// console.log(c.b); // ?
// delete c.b;
// console.log(c.b); // ?
// delete a.b;
// console.log(c.b); // ?
/** **************************************************** */
/** Output: [3, 2, 4]
 * console.log(3) вызывается немедленно, так как вы передаете результат console.log(3) как аргумент.
 * Это означает, что 3 будет выведено в консоль до завершения предыдущего .then() обработчика.
 *  */
// Promise.resolve(1)
//   .then(()=>{console.log(2)})
//   .then(console.log(3))
//   .then(()=>{console.log(4)})
/** **************************************************** */
/** Output: [1, 3, 5, 'Error: Упс...', 6, 2] */
// console.log(1);
// const promise = new Promise((resolve) => {
//   console.log(3);
//   setTimeout(() => console.log(2), 1000);
//   throw new Error("Упс...");
//   resolve();
// });
// promise.then(() => console.log(4));
// promise.catch(() => console.log(5));
// setTimeout(() => console.log(6), 2);
/** **************************************************** */
/** Output: [finish, "f-1 undefined", "c-2 start", "f-3 undefined", "t-4 two", "f-5 undefined", "result four"] */
// Promise.reject("start")
//   .finally(val => {
//     console.log("f1", val);
//     return "one";
//   })
//   .catch(val => {
//     console.log("c2", val);
//     return "two";
//   })
//   .finally(val => {
//     console.log("f3", val);
//     return "three";
//   })
//   .then(val => {
//     console.log("f4", val);
//     return "four";
//   })
//   .finally(val => {
//     console.log("f5", val);
//     return "five";
//   })
//   .then(val => console.log("result", val));
//
// console.log("finish");
/** **************************************************** */
/** Output: [1, 3, 2, Error 1, Success 3, Success 4] */
// function job() {
//   return new Promise(function(resolve, reject) {
//     reject();
//     console.log("3");
//   });
// }
//
// console.log("1");
//
// let promise = job();
//
// console.log("2");
//
// promise
//   .then(function() {
//     console.log("Success 1");
//   })
//   .then(function() {
//     console.log("Success 2");
//   })
//   .catch(function() {
//     console.log("Error 1");
//   })
//   .then(function() {
//     console.log("Success 3");
//   })
//   .then(function() {
//     console.log("Success 4");
//   });
/** **************************************************** */
/** Output: ["Last line! 1", "Promise! Результат funcTwo", "Last line! 2", "Promise! Результат funcOne", "Timeout! 1 0", "Timeout! 2 0"] */
// const myPromise = Promise.resolve(Promise.resolve("Promise!"));
//
// function funcOne() {
//   myPromise.then(res => res).then(res => console.log(res, "Результат funcOne"));
//   setTimeout(() => console.log("Timeout! 1"), 0);
//   console.log("Last line! 1");
// }
//
// async function funcTwo() {
//   const res = await myPromise;
//   console.log(res, "Результат funcTwo");
//   setTimeout(() => console.log("Timeout! 2"), 0);
//   console.log("Last line! 2");
// }
//
// funcOne();
// funcTwo();
/** **************************************************** */
/** Output: [1, f1, 2, a1, f2, a2, f3]
 * console.log('1');
 * (function() {
 *           console.log('f1');
 *           a('a1').then((res) => {
 *              console.log(res);
 *              console.log('f2');
 *              a('a2').then((res) => {
 *                 console.log.log(res);
 *                 console.log('f3');
 *              })
 *           })
 * })();
 * console.log('2');
 * */
// async function a(p) {
//   return p;
// }
//
// console.log("1");
// (async function() {
//   console.log("f1");
//   console.log(await a("a1"));
//   console.log("f2");
//   console.log(await a("a2"));
//   console.log("f3");
// })();
// console.log("2");
/** **************************************************** */
/** Output: [1, 2, x, y] */
// console.log(1);
// ["x", "y"].forEach(async (e) => {
//   console.log(await e);
// });
// console.log(2);
/** **************************************************** */
/** Output: [(await sum)] */
// const numbers = [4, 8, 15];
//
// const result = numbers.reduce( (sum, number) => {
//   return sum + number;
// }, 0);
//
// result.then((result) => {
//   console.log(result); // [object Promise] 15 - как исправить?
// });
/** **************************************************** */
/** Output: [1, "res1 2", 3, "res2 4"] */
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
//   });
//
// queueMicrotask(() => {
//   console.log("3");
// });
/** **************************************************** */
/** Output: [0] */
// var g = 0;
// g = 1 && g++;
// console.log(g);
/** **************************************************** */
/** Output: [Dog.prototype.bark] */
// Попытка вызова метода bark() объекта Dog вызывает ошибку. Почему?
// function Dog(name) {
//   this.name = name
// }
//
// Dog.bark = function() {
//   console.log(this.name + ' says woof')
// }
//
// let fido = new Dog('fido')
//
// fido.bark();
/** **************************************************** */
/**
 *  let count = 0;
 *   for (let i = 0; i < arr.length; i++) {
 *     if (arr[i] === target) {
 *       count++;
 *     }
 *   }
 *   return count;
 * */
//  Подсчет количества определенных элементов в массиве
// function countOccurrences(arr, target) {}
//
// const numbers = [2, 3, 2, 8, 2, 4, 5, 2];
// console.log(countOccurrences(numbers, 2)); // Вывод: 4
/** **************************************************** */
/**
 * let sum = 0;
 * for (const element of arr) {
 *   sum += element;
 * }
 * return sum;
 */
// function arraySum(arr) {}
//
// const numbers = [1, 2, 3, 4, 5];
// console.log(arraySum(numbers)); // Вывод: 15
/** **************************************************** */
/**
 * const obj = {};
 *   for (let i = 0; i < keys.length; i++) {
 *     obj[keys[i]] = values[i];
 *   }
 *   return obj;
 */
// const createObject = (keys, values) => {};
//
// const keys = ['name', 'age', 'country'];
// const values = ['Alice', 30, 'USA'];
// console.log(createObject(keys, values));  // Вывод: { name: 'Alice', age: 30, country: 'USA' }
/** **************************************************** */
/**
 * const charCount = {};
 * for (const char of str) {
 *   charCount[char] = (charCount[char] || 0) + 1;
 * }
 * for (const char of str) {
 *   if (charCount[char] === 1) {
 *     return char;
 *   }
 * }
 * return null;
 */
// Поиск первого неповторяющегося символа в строке: Напишите функцию для поиска первого неповторяющегося символа в строке.
// function firstUniqueChar(str) {
//   const charCount = {};
//
//   for (const char of str) {
//     if(charCount[char] === undefined) {
//       charCount[char] = 1;
//     } else {
//       charCount[char] += 1
//     }
//   }
//
//   for (const char of str) {
//     if (charCount[char] === 1) {
//       return char;
//     }
//   }
//
//   return null;
// }
//
//
// console.log(firstUniqueChar('qwertyqwertya'));
