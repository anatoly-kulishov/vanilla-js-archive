// function getClosure() {
//   var canYouSeeMe = "here I am";
//   return (function theClosure() {
//     return { canYouSeeIt: canYouSeeMe ? "yes!" : "no" };
//   });
// }
//
// var closure = getClosure();
// console.log(closure().canYouSeeIt); //
/** **************************************************************************************************************** **/
// console.log(x); //
//
// var x = 1;
//
// console.log(x); //
//
// function car() {
//   if (false) {
//     var x = 2;
//   }
//   console.log(x); //
// }
//
// car();
// console.log(x); //
/** **************************************************************************************************************** **/
// var a = 1;
// var b = 2;
//
// (function() {
//   var b = 3;
//   a += b;
// })();
//
// console.log(a); //
// console.log(b); //
/** **************************************************************************************************************** **/
// let foo = 1;
//
// (function f() {
//   console.log(foo);
//
//   if (foo) {
//     var foo = 2;
//   }
//
//   console.log(foo);
// })();
/** **************************************************************************************************************** **/
// console.log(NaN + 1 + null + 1); //
// console.log(NaN + 1 + null + 1 + ""); //
// console.log("" + NaN + 1 + null + 1 + ""); //

// console.log("number" + 15 + 3) //
// console.log(true + false) //
// console.log([] + null + 1) //
// console.log("foo" + +"bar") //
// console.log(!!"false" == !!"true") //
// console.log(null == '') //
// console.log([] == ![]) //
/** **************************************************************************************************************** **/
// function x() {}
//
// console.log(typeof x); //
// console.log(x instanceof Object); //

// var str1 = String(123);
// var str2 = new String(123);

// console.log(typeof str1, typeof str2); //
// console.log(str1 === str2); //

// console.log(str1 === String(123)); //
// console.log(str2 === new String(123)); //

// console.log(str1 === 123); //
// console.log(str1 === "123"); //

// console.log(str1 == str2); //
// console.log(str1 == 123); //
// console.log(str1 == "123"); //

// var y = [];
// console.log(typeof y); //
//
// var str3 = "123";
// str3[0] = "2";
// console.log(str3); //
/** **************************************************************************************************************** **/
// let z = 1;
//
// if(true) {
//     var f = 10;
//     // let a = 10;
//     b = 4;
//     let z = 5;
// }
//
// let d = {}
// d['a'] = 10
// d = { ...d }
//
// console.log(a) //
// console.log(b) //
// console.log(z) //
// console.log(d) //
// console.log(f) //
/** **************************************************************************************************************** **/
// let z = { d: 10 };
// let b = z;
// b.d = 11;
//
// if(b.d === z.d) console.log('Bad...') //
//
// let a = 1
// a.toString()
// if(typeof a == 'number') console.log('Why?') //
/** **************************************************************************************************************** **/
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
/** **************************************************************************************************************** **/
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
/** **************************************************************************************************************** **/
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
/** **************************************************************************************************************** **/
// var c = 1;
//
// function a(func) {
//   var c = 2;
//
//   func();
// }
//
// function b() {
//   console.log(c); //
// }
//
// a(b);
/** **************************************************************************************************************** **/
// function Animal(name) {}
// function Cat(name, color) {}
//
// var myCat = new Cat("Барсик", "рыжий");
//
// // Проверяем методы
// myCat.sayHello(); // Привет, я Барсик
// myCat.meow(); // Мяу!
/** **************************************************************************************************************** **/
// const singleNumber = (nums) => {
//     // Code here...
// };
//
// console.log(singleNumber([4, 1, 2, 1, 2])); // 4
// console.log(singleNumber([2, 2, 1])); // 1
// console.log(singleNumber([1])); // 1
/** **************************************************************************************************************** **/
// const reversLinkedList = (head) => {
//     // Code here...
// };
//
// console.log(reversLinkedList([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
// console.log(reversLinkedList([1, 2])); // [2, 1]
// console.log(reversLinkedList([])); // []
/** **************************************************************************************************************** **/
/**
 * Напиши на JS функцию, которая принимает два аргумента, массив из чисел и какое-то число.
 * Цель найти первую пару сумма которой будет равна второму аргументу
 * Сложность алгоритма должна быть быстрее n^2
 */
// function findPair(arr, target) {}
//
// // Пример использования функции
// const array = [1, 2, 3, 4, 5];
// const target = 7;
//
// const result = findPair(array, target);
// console.log(result); // [4, 3]
/** **************************************************************************************************************** **/
/** (Array.prototype.map) */
// Array.prototype.myMap = function(callback) {
//     // Code here...
// };
// console.log([1, 2, 3].myMap((el) => el * 2)) // [2, 4, 6]
/** (Array.prototype.some) */
// Array.prototype.mySome = function(callback) {
//     // Code here...
// };
// console.log([1, 2, 3].mySome((el) => el < 3)) // true
// console.log([1, 2, 3].mySome((el) => el > 3)) // false
